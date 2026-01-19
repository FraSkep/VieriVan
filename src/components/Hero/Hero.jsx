import "./Hero.css";
import useSmoothScroll from "../../hooks/useSmoothScroll";
import heroBg from "../../assets/vieri_surf.jpeg";
import useIsMobile from "../../hooks/useIsMobile.jsx";

function Hero() {
    const scrollToSection = useSmoothScroll(90);
    const isMobile = useIsMobile(780);

    const heroStyle = {
        background: `url(${heroBg}) ${
            isMobile ? "left" : "center"
        }/cover no-repeat`
    };

    return (
        <section
            className="hero-container" id="hero"
        >
            <div
                id="hero-bg"
                className="hero-epic"
                style={heroStyle}
            >

                <div className="hero-overlay"></div>

                <div className="hero-content">
                    <div className="hero-logo" />

                    <div className="hero-title-container">
                        <h1>
                            Trasformiamo van <br /> in liberta' su quattro ruote
                        </h1>

                        <p>
                            Progetti artigianali su misura per chi non vuole solo viaggiare,
                            ma vivere la strada.
                        </p>
                        <a key={"#services"}
                           onClick={() => scrollToSection("gallery")}
                           className="hero-button">
                            Scopri i progetti
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;