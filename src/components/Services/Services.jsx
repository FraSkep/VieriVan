import "./Services.css";
import { useEffect, useRef } from "react";
import {
    FaTools,
    FaBolt,
    FaCouch,
    FaTint,
    FaFireAlt,
    FaWater,
} from "react-icons/fa";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll.jsx";
import {Parallax} from "react-scroll-parallax";

function Services() {
    const cardsRef = useRef([]);
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

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    const services = [
        {
            icon: <FaTools />,
            title: "Arredi su misura",
            text: "Letti, mobili, cucine e soluzioni intelligenti costruite al millimetro.",
        },
        {
            icon: <FaBolt />,
            title: "Impianto elettrico",
            text: "Batterie, pannelli solari, luci e prese per essere autonomi ovunque.",
        },
        {
            icon: <FaTint />,
            title: "Isolamento termico",
            text: "Caldo d’inverno, fresco d’estate. Comfort vero, non promesse.",
        },
        {
            icon: <FaWater />,
            title: "Impianto idrico",
            text: "Serbatoi, pompe e docce per avere l’acqua sempre con te.",
        },
        {
            icon: <FaFireAlt />,
            title: "Riscaldamento",
            text: "Soluzioni per le notti fredde e i viaggi fuori stagione.",
        },
        {
            icon: <FaCouch />,
            title: "Layout personalizzato",
            text: "Ogni van è diverso, come chi lo guida. Progettiamo attorno a te.",
        },
    ];

    return (
        <section id="services" className="services fade-in-section" ref={fadeRef}>
           <div className="services-header">
                    <h2>Cosa possiamo fare per il tuo van</h2>
                    <p>
                        Ogni progetto nasce su misura. Qui trovi le principali aree su cui
                        interveniamo per trasformare un furgone in casa.
                    </p>
                </div>
            <div className="services-grid">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="service-card"
                        ref={(el) => (cardsRef.current[index] = el)}
                    >
                        <div className="service-icon">{service.icon}</div>
                        <h3>{service.title}</h3>
                        <p>{service.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Services;