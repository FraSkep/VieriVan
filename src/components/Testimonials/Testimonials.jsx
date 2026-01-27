import "./Testimonials.css";
import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll.jsx";

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const cardsRef = useRef([]);
    const fadeRef = useFadeInOnScroll();

    useEffect(() => {
        fetch("/data/testimonials.json")
            .then((res) => res.json())
            .then((json) => setTestimonials(json.data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (!testimonials.length) return;

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
    }, [testimonials]);

    // blocca scroll quando modal aperta
    useEffect(() => {
        document.body.style.overflow = selectedTestimonial ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [selectedTestimonial]);

    return (<>
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

                        <p className="testimonial-text preview">
                            {item.text}
                        </p>

                        <span className="testimonial-readmore">
                            Leggi tutto
                        </span>
                    </div>
                ))}
            </div>
        </section>
    {selectedTestimonial && (
        <div
            className="testimonial-modal"
            onClick={() => setSelectedTestimonial(null)}
        >
            <div
                className="testimonial-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="testimonial-close"
                    onClick={() => setSelectedTestimonial(null)}
                >
                    <FiX size={20} />
                </button>

                <div className="testimonial-header">
                    <img
                        src={selectedTestimonial.image}
                        alt={selectedTestimonial.name}
                        className="testimonial-avatar"
                    />
                    <div className="testimonial-author">
                        <strong>{selectedTestimonial.name}</strong>
                        <span>{selectedTestimonial.van}</span>
                    </div>
                </div>

                <p className="testimonial-text full">
                    {selectedTestimonial.text}
                </p>
            </div>
        </div>
    )}</>
    );
}

export default Testimonials;

// import "./Testimonials.css";
// import {useEffect, useRef, useState} from "react";
// import useFadeInOnScroll from "../../hooks/useFadeInOnScroll.jsx";
//
// function Testimonials() {
//     const [testimonials, setTestimonials] = useState([]);
//     const cardsRef = useRef([]);
//     const fadeRef = useFadeInOnScroll();
//
//     useEffect(() => {
//         fetch("/data/testimonials.json")
//             .then((res) => res.json())
//             .then(((json) => setTestimonials(json.data)))
//             .catch((err) => console.error(err));
//     }, []);
//
//
//     useEffect(() => {
//         if (!testimonials.length) return;
//
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add("visible");
//                     }
//                 });
//             },
//             { threshold: 0.2 }
//         );
//
//         cardsRef.current.forEach((el) => el && observer.observe(el));
//         return () => observer.disconnect();
//     }, [testimonials]);
//
//     return (
//         <section className="testimonials fade-in-section" id="testimonials" ref={fadeRef}>
//             <div className="testimonials-header">
//                 <h2>Cosa dicono i clienti</h2>
//                 <p>
//                     Le parole di chi è già partito. Niente filtri, solo esperienze vere.
//                 </p>
//             </div>
//
//             <div className="testimonials-grid">
//                 {testimonials.map((item, index) => (
//                     <div
//                         key={index}
//                         className="testimonial-card"
//                         ref={(el) => (cardsRef.current[index] = el)}
//                     >
//                         <span className="quote">“</span>
//
//                         <div className="testimonial-header">
//                             <img
//                                 src={item.image}
//                                 alt={item.name}
//                                 className="testimonial-avatar"
//                             />
//                             <div className="testimonial-author">
//                                 <strong>{item.name}</strong>
//                                 <span>{item.van}</span>
//                             </div>
//                         </div>
//
//                         <p className="testimonial-text">{item.text}</p>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// }
//
// export default Testimonials;
