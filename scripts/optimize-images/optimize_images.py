#!/usr/bin/env python3
"""
Ridimensiona e ricomprime le immagini del progetto alla risoluzione
realmente necessaria per come vengono mostrate in pagina, senza
cambiare filename/formato (nessuna modifica al codice richiesta).

Uso:
    python3 scripts/optimize-images/optimize_images.py
        -> processa tutte le cartelle/loghi noti (vedi TARGETS sotto)

    python3 scripts/optimize-images/optimize_images.py public/data/gallery_img/nuovo_van
        -> processa solo il percorso indicato (file o cartella),
           la categoria viene dedotta dal path

    Opzioni:
        --dry-run   mostra cosa farebbe senza scrivere nulla
        --force     ricomprime anche le immagini gia' entro le dimensioni target
                     (di default vengono saltate: sono gia' state ottimizzate)
        --quality N forza una quality JPEG specifica per questo run

Richiede Pillow: pip3 install Pillow
"""
import argparse
import os
import sys

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Manca Pillow. Installa con: pip3 install Pillow")

# ─── Categorie note: (pattern nel path, max lato lungo in px, quality JPEG) ───
# Aggiungi qui nuove cartelle/loghi quando li introduci nel progetto.
TARGETS = [
    ("public/data/gallery_img", 1800, 80),   # cover grid + lightbox
    ("public/data/team_img", 900, 82),
    ("public/data/testimonials_img", 300, 82),
    ("src/assets/loghi/logo5t.png", 900, 88),   # hero-logo, background min-height:30vh
    ("src/assets/loghi/logo1t.png", 320, 90),   # header-logo, height:100px
    ("src/assets/loghi/logo4t.png", 320, 90),   # header-logo, height:100px
]
FALLBACK = (1600, 82)  # per path non riconosciuti

IMG_EXTS = {".jpg", ".jpeg", ".png"}


def match_target(path):
    norm = path.replace(os.sep, "/")
    for pattern, max_side, quality in TARGETS:
        if pattern in norm:
            return max_side, quality
    return FALLBACK


def optimize(path, max_side, quality, dry_run=False, force=False):
    orig_size = os.path.getsize(path)
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)  # auto-orient da EXIF prima di droppare i metadata

    w, h = im.size
    scale = min(1.0, max_side / max(w, h))  # mai upscale

    if scale >= 1.0 and not force:
        return orig_size, None, w, h, (w, h)  # gia' entro target, skip

    new_size = (w, h)
    if scale < 1.0:
        new_size = (max(1, round(w * scale)), max(1, round(h * scale)))
        im = im.resize(new_size, Image.LANCZOS)

    ext = os.path.splitext(path)[1].lower()
    save_kwargs = {"optimize": True}
    if ext in (".jpg", ".jpeg"):
        if im.mode in ("RGBA", "P"):
            im = im.convert("RGB")
        save_kwargs.update(quality=quality, progressive=True)
        target_fmt = "JPEG"
    elif ext == ".png":
        target_fmt = "PNG"
    else:
        target_fmt = im.format

    if not dry_run:
        im.save(path, target_fmt, **save_kwargs)

    new_size_bytes = os.path.getsize(path) if not dry_run else None
    return orig_size, new_size_bytes, w, h, new_size


def collect_files(paths):
    files = []
    for p in paths:
        if os.path.isdir(p):
            for root, _dirs, names in os.walk(p):
                for name in names:
                    if os.path.splitext(name)[1].lower() in IMG_EXTS:
                        files.append(os.path.join(root, name))
        elif os.path.isfile(p):
            files.append(p)
        else:
            print(f"[skip] percorso non trovato: {p}")
    return files


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("paths", nargs="*", help="file/cartelle da processare (default: tutti i target noti)")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--force", action="store_true", help="ricomprime anche se gia' entro le dimensioni target")
    parser.add_argument("--quality", type=int, default=None, help="forza una quality JPEG per questo run")
    args = parser.parse_args()

    default_paths = [t[0] for t in TARGETS if os.path.isdir(t[0])] or []
    default_paths += [t[0] for t in TARGETS if os.path.isfile(t[0])]
    paths = args.paths or default_paths

    files = collect_files(paths)
    if not files:
        print("Nessuna immagine trovata.")
        return

    total_before = total_after = 0
    processed = skipped = 0

    for fpath in sorted(files):
        max_side, quality = match_target(fpath)
        if args.quality:
            quality = args.quality
        before, after, w, h, newsize = optimize(fpath, max_side, quality, dry_run=args.dry_run, force=args.force)
        total_before += before
        if after is None:
            skipped += 1
            continue
        processed += 1
        total_after += after
        tag = "[dry-run] " if args.dry_run else ""
        print(f"{tag}{fpath}: {w}x{h} {before/1024:.0f}KB -> {newsize[0]}x{newsize[1]} {after/1024:.0f}KB")

    print(f"\nProcessate: {processed}  |  Saltate (gia' ottimizzate): {skipped}")
    if total_after:
        print(f"Totale immagini processate: {total_before/1024/1024:.2f}MB -> {total_after/1024/1024:.2f}MB "
              f"(-{100*(1-total_after/total_before):.1f}%)")


if __name__ == "__main__":
    main()
