import "./Gallery.css";
import { useEffect, useRef, useState } from "react";

import van1 from "../../assets/Van1.jpg";
import van2 from "../../assets/Van2.jpg";
import van3 from "../../assets/Van3.jpg";
import van4 from "../../assets/Van4.jpg";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll.jsx";

function Gallery() {
    const galleryRef = useRef([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const fadeRef = useFadeInOnScroll();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.2 }
        );

        galleryRef.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const projects = [
        {
            image: van1,
            title: "Sprinter 4x4",
            text: "Allestimento completo per viaggi off-road",
        },
        {
            image: van2,
            title: "Ducato L2H2",
            text: "Van compatto per surf trip e weekend lunghi",
        },
        {
            image: van3,
            title: "Transporter T6",
            text: "Minimal, leggero, essenziale",
        },
        {
            image: van4,
            title: "Daily Camper",
            text: "Casa su ruote per due + cane",
        },
    ];

    return (
        <section id="gallery" className="gallery fade-in-section" ref={fadeRef}>
            <div className="gallery-header">
                <h2>Alcuni lavori realizzati</h2>
                <p>
                    Ogni van racconta una storia diversa. Ecco alcuni progetti usciti
                    dalla nostra officina.
                </p>
            </div>

            <div className="gallery-grid">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="gallery-card"
                        ref={(el) => (galleryRef.current[index] = el)}
                        onClick={() => setSelectedImage(project)}
                    >
                        <div className="gallery-image-wrapper">
                            <img src={project.image} alt={project.title} />
                        </div>
                        <div className="gallery-info">
                            <h3>{project.title}</h3>
                            <p>{project.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className="lightbox" onClick={() => setSelectedImage(null)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage.image} alt={selectedImage.title} />
                        <div className="lightbox-text">
                            <h3>{selectedImage.title}</h3>
                            <p>{selectedImage.text}</p>
                        </div>
                        <button
                            className="lightbox-close"
                            onClick={() => setSelectedImage(null)}
                        >✕</button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Gallery;
