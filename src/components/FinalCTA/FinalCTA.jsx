import "./FinalCTA.css";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll.jsx";
import { Parallax } from "react-scroll-parallax";


function FinalCTA() {
    // const scrollToSection = useSmoothScroll(90);
    const fadeRef = useFadeInOnScroll();



    return (
        // <section id="contact" className="final-cta fade-in-section" ref={fadeRef}>
        <section id="contact" className="final-cta">
            <div className="final-cta-overlay"></div>
            {/*<Parallax speed={35}>*/}
                <div className="final-cta-content fade-in-section" ref={fadeRef}>
                    <h2>
                        Il tuo van non e' un mezzo. <br />
                        E' una promessa di liberta'.
                    </h2>

                    <p>
                        Raccontaci la tua idea, i tuoi viaggi, il tuo modo di vivere la strada.
                        Insieme possiamo trasformare un furgone in casa, rifugio, compagno di
                        avventure.
                    </p>

                    <div className="final-cta-actions">
                        {/*<button*/}
                        {/*    className="final-cta-button"*/}
                        {/*    onClick={() => scrollToSection("form")}*/}
                        {/*>*/}
                        {/*    Inizia il tuo progetto*/}
                        {/*</button>*/}

                        <div className="final-cta-contacts">
                            <span>📞 +39 XXX XXX XXXX</span>
                            <span>✉️ Vierivanlife@gmail.com</span>
                            <span className="instagram">
                            📸 <a href="https://www.instagram.com/vieri_van" target="_blank" rel="noreferrer">
                              @vieri_van
                            </a>
                        </span>
                        </div>
                    </div>
                </div>
            {/*</Parallax>*/}
        </section>
    );
}

export default FinalCTA;
