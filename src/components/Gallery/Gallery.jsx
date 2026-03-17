import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import "./Gallery.css";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import useIsMobile from "../../hooks/useIsMobile.jsx";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll.jsx";

// ─── Preload helper ───────────────────────────────────────────────────────────
// Carica in memoria le immagini adiacenti a quella corrente (prev, current, next)
// e poi in background le restanti con bassa priorità.
const preloadImages = (images, currentIndex) => {
    const priority = [
        currentIndex - 1,
        currentIndex,
        currentIndex + 1,
    ].filter((i) => i >= 0 && i < images.length);

    // Priorità alta: immagini vicine
    priority.forEach((i) => {
        const img = new Image();
        img.src = images[i];
    });

    // Bassa priorità: le restanti
    images.forEach((src, i) => {
        if (!priority.includes(i)) {
            // requestIdleCallback garantisce che non blocchi il render
            const load = () => { new Image().src = src; };
            if ("requestIdleCallback" in window) {
                requestIdleCallback(load);
            } else {
                setTimeout(load, 300);
            }
        }
    });
};
// ─────────────────────────────────────────────────────────────────────────────

const swipeVariants = {
    enter: (dir) => ({ x: dir > 0 ? 120 : -120, opacity: 0 }),
    center:        { x: 0, opacity: 1 },
    exit:  (dir) => ({ x: dir > 0 ? -120 : 120, opacity: 0 }),
};

// ─── Lightbox (rendered via Portal → sempre sopra tutto) ─────────────────────
const Lightbox = ({ project, currentIndex, direction, isMobile, onClose, onNext, onPrev }) => {
    return createPortal(
        <div className="lightbox" onClick={onClose}>
            {/* Pulsante chiudi: ancorato alla viewport, NON dentro lightbox-content */}
            <button className="lightbox-close" onClick={onClose} aria-label="Chiudi">
                <FiX size={22} />
            </button>

            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <div className="lightbox-slider">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.img
                            key={currentIndex}
                            src={project.images[currentIndex]}
                            alt={`${project.title} – ${currentIndex + 1}`}
                            className="lightbox-image"
                            variants={swipeVariants}
                            custom={direction}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.32, ease: "easeOut" }}
                            // Swipe su TUTTI i dispositivi (framer-motion gestisce sia touch che mouse)
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.12}
                            dragMomentum={false}
                            onDragEnd={(_, info) => {
                                if (info.offset.x < -60) onNext();
                                if (info.offset.x > 60)  onPrev();
                            }}
                            style={{ position: "absolute", touchAction: "pan-y" }}
                        />
                    </AnimatePresence>
                </div>

                {/* Frecce solo su desktop */}
                {!isMobile && (
                    <div className="slider-controls">
                        <BiChevronLeftCircle  className="slider-btn left"  onClick={onPrev} />
                        <BiChevronRightCircle className="slider-btn right" onClick={onNext} />
                    </div>
                )}

                <div className="slider-dots">
                    {project.images.map((_, i) => (
                        <span
                            key={i}
                            className={`dot ${i === currentIndex ? "active" : ""}`}
                            onClick={() => {/* opzionale: click su dot */}}
                        />
                    ))}
                </div>

                <div className="lightbox-text">
                    <h3>{project.title}</h3>
                    <p>{project.text}</p>
                </div>
            </div>
        </div>,
        document.body   // ← renderizzato direttamente in <body>, fuori da qualsiasi transform/filter
    );
};
// ─────────────────────────────────────────────────────────────────────────────

const Gallery = () => {
    const [projects, setProjects]               = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection]             = useState(0);

    const isMobile = useIsMobile(1080);
    const fadeRef  = useFadeInOnScroll();

    // Fetch gallery data
    useEffect(() => {
        fetch("/data/gallery.json")
            .then((res) => res.json())
            .then((json) => setProjects(json.data))
            .catch((err) => console.error("Gallery fetch error:", err));
    }, []);

    // Blocca scroll body quando lightbox è aperto
    useEffect(() => {
        document.body.style.overflow = selectedProject ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [selectedProject]);

    // Preload immagini quando cambia indice o progetto
    useEffect(() => {
        if (selectedProject) {
            preloadImages(selectedProject.images, currentImageIndex);
        }
    }, [selectedProject, currentImageIndex]);

    // Keyboard navigation
    useEffect(() => {
        if (!selectedProject) return;
        const onKey = (e) => {
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft")  handlePrev();
            if (e.key === "Escape")     handleClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [selectedProject, currentImageIndex]); // eslint-disable-line

    const handleOpen = useCallback((project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
        setDirection(0);
    }, []);

    const handleClose = useCallback(() => setSelectedProject(null), []);

    const handleNext = useCallback(() => {
        setDirection(1);
        setCurrentImageIndex((prev) =>
            prev === selectedProject.images.length - 1 ? 0 : prev + 1
        );
    }, [selectedProject]);

    const handlePrev = useCallback(() => {
        setDirection(-1);
        setCurrentImageIndex((prev) =>
            prev === 0 ? selectedProject.images.length - 1 : prev - 1
        );
    }, [selectedProject]);

    return (
        <section id="gallery" className="gallery-section fade-in-section" ref={fadeRef}>
            <h2 className="gallery-title">Lavori realizzati</h2>

            <div className="gallery-grid">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="gallery-card"
                        onClick={() => handleOpen(project)}
                    >
                        <div className="gallery-image-wrapper">
                            {/* loading="lazy" → il browser carica la cover solo quando è vicina alla viewport */}
                            <img src={project.cover} alt={project.title} loading="lazy" />
                        </div>
                        <div className="gallery-info">
                            <h3>{project.title}</h3>
                            <p>{project.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox montato via Portal */}
            {selectedProject && (
                <Lightbox
                    project={selectedProject}
                    currentIndex={currentImageIndex}
                    direction={direction}
                    isMobile={isMobile}
                    onClose={handleClose}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}
        </section>
    );
};

export default Gallery;