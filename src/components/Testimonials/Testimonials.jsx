import "./Testimonials.css";
import { useEffect, useRef } from "react";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll.jsx";

function Testimonials() {
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

        cardsRef.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const testimonials = [
        {
            name: "Luca",
            van: "Ducato L2H2",
            text: "Volevo un van semplice ma curato. Mi sono ritrovato con una casa vera. Ogni dettaglio ha senso, ogni spazio è sfruttato.",
        },
        {
            name: "Sara & Marco",
            van: "Sprinter 4x4",
            text: "Ci ha ascoltati davvero. Viaggiamo con il cane, facciamo surf, viviamo fuori. Il van è diventato parte del nostro stile di vita.",
        },
        {
            name: "Andrea",
            van: "Transporter T6",
            text: "Zero fronzoli, solo cose fatte bene. Dopo due anni e migliaia di chilometri è ancora perfetto.",
        },
    ];

    return (
        <section className="testimonials fade-in-section" id="testimonials" ref={fadeRef}>
            <div className="testimonials-header">
                <h2>Cosa dicono i clienti</h2>
                <p>
                    Le parole di chi è già partito. Niente filtri, solo esperienze vere.
                </p>
            </div>

            <div className="testimonials-grid">
                {testimonials.map((item, index) => (
                    <div
                        key={index}
                        className="testimonial-card"
                        ref={(el) => (cardsRef.current[index] = el)}
                    >
                        <span className="quote">“</span>
                        <p className="testimonial-text">{item.text}</p>
                        <div className="testimonial-author">
                            <strong>{item.name}</strong>
                            <span>{item.van}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Testimonials;
