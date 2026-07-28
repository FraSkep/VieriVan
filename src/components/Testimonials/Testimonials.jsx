import "./Testimonials.css";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll.jsx";

// ─── Modal (Portal → sempre sopra tutto, position:fixed affidabile) ───────────
const TestimonialModal = ({ item, onClose }) => {
    // Chiudi con Escape
    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return createPortal(
        <div className="testimonial-modal" onClick={onClose}>
            <div
                className="testimonial-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="testimonial-close"
                    onClick={onClose}
                >
                    <FiX size={20} />
                </button>

                <div className="testimonial-author-row">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="testimonial-avatar"
                        loading="lazy"
                    />
                    <div className="testimonial-author">
                        <strong>{item.name}</strong>
                        <span>{item.van}</span>
                    </div>
                </div>

                <p className="testimonial-text">{item.text}</p>
            </div>
        </div>,
        document.body
    );
};
// ─────────────────────────────────────────────────────────────────────────────

function Testimonials() {
    const [testimonials, setTestimonials]         = useState([]);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const cardsRef = useRef([]);
    const fadeRef  = useFadeInOnScroll();

    // Fetch dati
    useEffect(() => {
        fetch("/data/testimonials.json")
            .then((res) => res.json())
            .then((json) => setTestimonials(json.data))
            .catch((err) => console.error(err));
    }, []);

    // Animazione card all'entrata nella viewport
    useEffect(() => {
        if (!testimonials.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target); // smette di osservare dopo il trigger
                    }
                });
            },
            { threshold: 0.15 }
        );

        cardsRef.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, [testimonials]);

    // Blocca scroll body quando modal è aperta
    useEffect(() => {
        document.body.style.overflow = selectedTestimonial ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [selectedTestimonial]);

    return (
        <>
            <section
                className="testimonials fade-in-section"
                id="testimonials"
                ref={fadeRef}
            >
                <div className="testimonials-header">
                    <h2>Cosa dicono i clienti</h2>
                    <p>Le parole di chi è già partito. Niente filtri, solo esperienze vere.</p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="testimonial-card"
                            ref={(el) => (cardsRef.current[index] = el)}
                            onClick={() => setSelectedTestimonial(item)}
                        >
                            <span className="quote">"</span>

                            {/* Rinominato in author-row per evitare conflitto con .testimonials-header */}
                            <div className="testimonial-author-row">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="testimonial-avatar"
                                    loading="lazy"
                                />
                                <div className="testimonial-author">
                                    <strong>{item.name}</strong>
                                    <span>{item.van}</span>
                                </div>
                            </div>

                            <p className="testimonial-text preview">{item.text}</p>

                            <span className="testimonial-readmore">Leggi tutto →</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal via Portal */}
            {selectedTestimonial && (
                <TestimonialModal
                    item={selectedTestimonial}
                    onClose={() => setSelectedTestimonial(null)}
                />
            )}
        </>
    );
}

export default Testimonials;