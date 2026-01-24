import {useState, useRef, useEffect} from "react";
// import ganesh1 from "../../../public/data/gallery_img/ganesh/ganesh1.jpeg";
// import ganesh2 from "../../../public/data/gallery_img/ganesh/ganesh2.jpeg";
// import ganesh3 from "../../../public/data/gallery_img/ganesh/ganesh3.jpeg";
// import ganesh4 from "../../../public/data/gallery_img/ganesh/ganesh4.jpeg";
// import ganesh5 from "../../../public/data/gallery_img/ganesh/ganesh5.jpeg";
// import oliviero1  from "../../../public/data/gallery_img/oliviero/oliviero1.jpeg";
// import oliviero2  from "../../../public/data/gallery_img/oliviero/oliviero2.jpeg";
// import oliviero3  from "../../../public/data/gallery_img/oliviero/oliviero3.jpeg";
// import oliviero4  from "../../../public/data/gallery_img/oliviero/oliviero4.jpeg";
// import oliviero5  from "../../../public/data/gallery_img/oliviero/oliviero5.jpeg";
// import oliviero6  from "../../../public/data/gallery_img/oliviero/oliviero6.jpeg";
// import oliviero7  from "../../../public/data/gallery_img/oliviero/oliviero7.jpeg";
// import caddyfornia1 from "../../../public/data/gallery_img/caddyfornia/caddyfornia1.jpeg"
// import caddyfornia2 from "../../../public/data/gallery_img/caddyfornia/caddyfornia2.jpeg"
// import caddyfornia3 from "../../../public/data/gallery_img/caddyfornia/caddyfornia3.jpeg"
// import caddyfornia4 from "../../../public/data/gallery_img/caddyfornia/caddyfornia4.jpeg"
// import caddyfornia5 from "../../../public/data/gallery_img/caddyfornia/caddyfornia5.jpeg"
// import caddyfornia6 from "../../../public/data/gallery_img/caddyfornia/caddyfornia6.jpeg"
// import caddyfornia7 from "../../../public/data/gallery_img/caddyfornia/caddyfornia7.jpeg"
// import willy1 from "../../../public/data/gallery_img/willy/willy1.jpeg"
// import willy2 from "../../../public/data/gallery_img/willy/willy2.jpeg"
// import willy3 from "../../../public/data/gallery_img/willy/willy3.jpeg"
// import willy4 from "../../../public/data/gallery_img/willy/willy4.jpeg"
// import willy5 from "../../../public/data/gallery_img/willy/willy5.jpeg"
// import wolly1 from "../../../public/data/gallery_img/wolly/wolly1.jpeg"
// import wolly2 from "../../../public/data/gallery_img/wolly/wolly2.jpeg"
// import wolly3 from "../../../public/data/gallery_img/wolly/wolly3.jpeg"
// import wolly4 from "../../../public/data/gallery_img/wolly/wolly4.jpeg"
// import wolly5 from "../../../public/data/gallery_img/wolly/wolly5.jpeg"
// import wolly6 from "../../../public/data/gallery_img/wolly/wolly6.jpeg"
// import wolly7 from "../../../public/data/gallery_img/wolly/wolly7.jpeg"


import "./Gallery.css";
import { motion, AnimatePresence } from "framer-motion";
import {FiX} from "react-icons/fi";
import useIsMobile from "../../hooks/useIsMobile.jsx";
import {BiChevronLeftCircle, BiChevronRightCircle} from "react-icons/bi";

// const projects = [
//     {
//         title: "Ganesh Van",
//         text: "Allestimento completo per viaggi off-grid, cucina, letto e pannelli solari.",
//         cover: ganesh1,
//         images: [ganesh1, ganesh2, ganesh3, ganesh4, ganesh5]
//     },
//     {
//         title: "Oliviero Van",
//         text: "Soluzione compatta, essenziale e super funzionale.",
//         cover: oliviero5,
//         images: [oliviero1, oliviero2, oliviero3, oliviero4, oliviero5, oliviero6, oliviero7]
//     },
//     {
//         title: "Caddyfornia Van",
//         text: "Spazio per tavole, doccia esterna e mood coastal.",
//         cover: caddyfornia1,
//         images: [caddyfornia1, caddyfornia2, caddyfornia3, caddyfornia4, caddyfornia5, caddyfornia6, caddyfornia7]
//     },
//     {
//         title: "Willy Van",
//         text: "Tutto il necessario per vivere al meglio la van life.",
//         cover: willy1,
//         images: [willy1, willy2, willy3, willy4, willy5]
//     },
//     {
//         title: "Wolly Van",
//         text: "Legno di rovere ed eleganza",
//         cover: wolly1,
//         images: [wolly1, wolly2, wolly3, wolly4, wolly5, wolly6, wolly7]
//     }
// ];

const Gallery = () => {
    const [projects, setProjects] = useState()
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const isMobile = useIsMobile(1080);
    // const isMobileHorizontal = useIsMobile(1200);
    // const fadeRef = useFadeInOnScroll();

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const [direction, setDirection] = useState(0);
    // 1 = avanti (swipe left)
    // -1 = indietro (swipe right)

    useEffect(() => {
        fetch("/data/gallery.json")
            .then((res) => res.json())
            .then(((json) => {
                console.log(json);
                setProjects(json.data);
            }))
            .catch((err) => console.error(err));
    }, []);

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

    const swipeVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction > 0 ? -100 : 100,
            opacity: 0
        })
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentImageIndex((prev) =>
            prev === selectedProject.images.length - 1 ? 0 : prev + 1
        );
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentImageIndex((prev) =>
            prev === 0 ? selectedProject.images.length - 1 : prev - 1
        );
    };

    return (
        <section id="gallery" className="gallery-section">
            <h2 className="gallery-title">Lavori realizzati</h2>
            <div className="gallery-grid">
                {projects && projects.map((project, index) => (
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
                            {isMobile ?
                                <AnimatePresence initial={false} custom={direction}>
                                    <motion.img
                                        key={currentImageIndex}
                                        src={selectedProject.images[currentImageIndex]}
                                        alt={selectedProject.title}
                                        className="lightbox-image"
                                        variants={swipeVariants}
                                        custom={direction}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.35, ease: "easeOut" }}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        dragElastic={0.15}
                                        dragMomentum={false}
                                        onDragEnd={(e, info) => {
                                            if (info.offset.x < -100) handleNext();
                                            if (info.offset.x > 100) handlePrev();
                                        }}
                                        style={{ position: "absolute" }}
                                    />
                                </AnimatePresence> :
                                <>
                                    {/*<img*/}
                                    {/*    src={selectedProject.images[currentImageIndex]}*/}
                                    {/*    alt={selectedProject.title}*/}
                                    {/*    className="lightbox-image"*/}
                                    {/*/>*/}
                                    <AnimatePresence initial={false} custom={direction}>
                                        <motion.img
                                            key={currentImageIndex}
                                            src={selectedProject.images[currentImageIndex]}
                                            alt={selectedProject.title}
                                            className="lightbox-image"
                                            variants={swipeVariants}
                                            custom={direction}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.35, ease: "easeOut" }}
                                            style={{ position: "absolute" }}
                                        />
                                    </AnimatePresence>
                                </>
                            }
                        </div>
                        { isMobile ? <></> :
                        <div className="slider-controls">
                            <BiChevronLeftCircle className="slider-btn" onClick={handlePrev}/>
                            <BiChevronRightCircle className="slider-btn" onClick={handleNext}/>
                        </div> }
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