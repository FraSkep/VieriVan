import "./Testimonials.css";
import { useEffect, useRef } from "react";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll.jsx";
import ganesh from "../../assets/testimonials/GaneshVan.jpeg";
import olivieroVan from "../../assets/testimonials/oliviero5.jpeg";
import caddyfornia from "../../assets/testimonials/caddyfornia1.jpeg"
import wollyVan from "../../assets/testimonials/img.png"

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
            name: "Sara",
            van: "Opel Vivaro",
            image: ganesh,
            text: "Dopo mesi di incertezze e confusione è arrivato Vieri, con tanta pazienza, ad aiutarmi e dare vita al mio sogno su due ruote; Ganesh (così è stato ribattezzato il mio Opel Vivaro) è bellissimo, e per ogni problema Vieri è disponibile a aiutarmi anche a distanza. continuerò a consigliarlo ad amici e amici di amici. grazie ❤️",
        },
        {
            name: "Oliviero",
            van: "Sprinter 4x4",
            image: olivieroVan,
            text: "Ci ha ascoltati davvero. Viaggiamo con il cane, facciamo surf, viviamo fuori. Il van è diventato parte del nostro stile di vita.",
        },
        {
            name: "Davide",
            van: "Caddy",
            image: caddyfornia,
            text: "Zero fronzoli, solo cose fatte bene. Dopo due anni e migliaia di chilometri è ancora perfetto.",
        },
        {
            name: "Wolly",
            van: "Transporter T6",
            image: wollyVan,
            text: "Zero fronzoli, solo cose fatte bene. Dopo due anni e migliaia di chilometri è ancora perfetto.",
        }
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

                        <div className="testimonial-header">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="testimonial-avatar"
                            />
                            <div className="testimonial-author">
                                <strong>{item.name}</strong>
                                <span>{item.van}</span>
                            </div>
                        </div>

                        <p className="testimonial-text">{item.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Testimonials;
