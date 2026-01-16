import {useState, useRef, useEffect} from "react";
import ganesh1 from "../../assets/ganesh/ganesh1.jpeg";
import ganesh2 from "../../assets/ganesh/ganesh2.jpeg";
import ganesh3 from "../../assets/ganesh/ganesh3.jpeg";
import ganesh4 from "../../assets/ganesh/ganesh4.jpeg";
import ganesh5 from "../../assets/ganesh/ganesh5.jpeg";
import oliviero1  from "../../assets/oliviero/oliviero1.jpeg";
import oliviero2  from "../../assets/oliviero/oliviero2.jpeg";
import oliviero3  from "../../assets/oliviero/oliviero3.jpeg";
import oliviero4  from "../../assets/oliviero/oliviero4.jpeg";
import oliviero5  from "../../assets/oliviero/oliviero5.jpeg";
import oliviero6  from "../../assets/oliviero/oliviero6.jpeg";
import oliviero7  from "../../assets/oliviero/oliviero7.jpeg";
import caddyfornia1 from "../../assets/caddyfornia/caddyfornia1.jpeg"
import caddyfornia2 from "../../assets/caddyfornia/caddyfornia2.jpeg"
import caddyfornia3 from "../../assets/caddyfornia/caddyfornia3.jpeg"
import caddyfornia4 from "../../assets/caddyfornia/caddyfornia4.jpeg"
import caddyfornia5 from "../../assets/caddyfornia/caddyfornia5.jpeg"
import caddyfornia6 from "../../assets/caddyfornia/caddyfornia6.jpeg"
import caddyfornia7 from "../../assets/caddyfornia/caddyfornia7.jpeg"
import willy1 from "../../assets/willy/willy1.jpeg"
import willy2 from "../../assets/willy/willy2.jpeg"
import willy3 from "../../assets/willy/willy3.jpeg"
import willy4 from "../../assets/willy/willy4.jpeg"
import willy5 from "../../assets/willy/willy5.jpeg"
import wolly1 from "../../assets/wolly/wolly1.jpeg"
import wolly2 from "../../assets/wolly/wolly2.jpeg"
import wolly3 from "../../assets/wolly/wolly3.jpeg"
import wolly4 from "../../assets/wolly/wolly4.jpeg"
import wolly5 from "../../assets/wolly/wolly5.jpeg"
import wolly6 from "../../assets/wolly/wolly6.jpeg"
import wolly7 from "../../assets/wolly/wolly7.jpeg"

import "./Gallery.css";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll.jsx";
import {FiX} from "react-icons/fi";

const projects = [
    {
        title: "Ganesh Van",
        text: "Allestimento completo per viaggi off-grid, cucina, letto e pannelli solari.",
        cover: ganesh1,
        images: [ganesh1, ganesh2, ganesh3, ganesh4, ganesh5]
    },
    {
        title: "Oliviero Van",
        text: "Soluzione compatta, essenziale e super funzionale.",
        cover: oliviero5,
        images: [oliviero1, oliviero2, oliviero3, oliviero4, oliviero5, oliviero6, oliviero7]
    },
    {
        title: "Caddyfornia Van",
        text: "Spazio per tavole, doccia esterna e mood coastal.",
        cover: caddyfornia1,
        images: [caddyfornia1, caddyfornia2, caddyfornia3, caddyfornia4, caddyfornia5, caddyfornia6, caddyfornia7]
    },
    {
        title: "Willy Van",
        text: "Tutto il necessario per vivere al meglio la van life.",
        cover: willy1,
        images: [willy1, willy2, willy3, willy4, willy5]
    },
    {
        title: "Wolly Van",
        text: "Legno di rovere ed eleganza",
        cover: wolly1,
        images: [wolly1, wolly2, wolly3, wolly4, wolly5, wolly6, wolly7]
    }
];

const Gallery = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const fadeRef = useFadeInOnScroll();

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedProject]);



    const handlePrev = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? selectedProject.images.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentImageIndex((prev) =>
            prev === selectedProject.images.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <section id="gallery" className="gallery-section">
            <h2 className="gallery-title">Lavori realizzati</h2>
            <div className="gallery-grid">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="gallery-card"
                        onClick={() => {
                            setSelectedProject(project);
                            setCurrentImageIndex(0);
                        }}
                    >
                        <div className="gallery-image-wrapper">
                            <img src={project.cover} alt={project.title} />
                        </div>
                        <div className="gallery-info">
                            <h3>{project.title}</h3>
                            <p>{project.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedProject && (
                <div className="lightbox" onClick={() => setSelectedProject(null)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>

                        <div className="lightbox-slider">
                            <img
                                src={selectedProject.images[currentImageIndex]}
                                alt={selectedProject.title}
                                className="lightbox-image"
                                onTouchStart={(e) =>
                                    (touchStartX.current = e.changedTouches[0].screenX)
                                }
                                onTouchEnd={(e) => {
                                    touchEndX.current = e.changedTouches[0].screenX;

                                    if (touchStartX.current - touchEndX.current > 50) handleNext();
                                    if (touchEndX.current - touchStartX.current > 50) handlePrev();
                                }}
                            />
                            <div className="slider-controls">
                                <button className="slider-btn" onClick={handlePrev}>‹</button>
                                <button className="slider-btn" onClick={handleNext}>›</button>
                            </div>
                        </div>

                        <div className="slider-dots">
                            {selectedProject.images.map((_, i) => (
                                <span
                                    key={i}
                                    className={`dot ${i === currentImageIndex ? "active" : ""}`}
                                />
                            ))}
                        </div>

                        <div className="lightbox-text">
                            <h3>{selectedProject.title}</h3>
                            <p>{selectedProject.text}</p>
                        </div>
                        <button
                            className="lightbox-close"
                            onClick={() => setSelectedProject(null)}
                        >
                            <FiX size={20}/>
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;