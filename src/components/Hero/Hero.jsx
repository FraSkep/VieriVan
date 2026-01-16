import "./Hero.css";
import useSmoothScroll from "../../hooks/useSmoothScroll";
import heroBg from "../../assets/sfondo5.jpeg";

function Hero() {
    const scrollToSection = useSmoothScroll(90);
    return (
        <section
            className="hero-container" id="hero"
        >
            <div
                className="hero-epic"
                style={{ backgroundImage: `url(${heroBg})` }}
            >

                <div className="hero-overlay"></div>

                <div className="hero-content">
                    <div className="hero-logo" />

                    <div className="hero-title-container">
                        <h1>
                            Trasformiamo van <br /> in libertà su quattro ruote
                        </h1>

                        <p>
                            Progetti artigianali su misura per chi non vuole solo viaggiare,
                            ma vivere la strada.
                        </p>
                        <a key={"#services"}
                           onClick={() => scrollToSection("services")}
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
// import "./Hero.css";
// import logo from "../../assets/vieriVanLogo.jpg";
//
// function Hero() {
//     return (
//         <section className="hero">
//             <div className="hero-content">
//                 <img src={logo} alt="VieriVan logo" className="hero-logo" />
//
//                 <h1>
//                     Trasformiamo van <br /> in case su ruote
//                 </h1>
//
//                 <p>
//                     Allestimenti artigianali su misura per viaggiatori, surfisti,
//                     sognatori e spiriti liberi.
//                 </p>
//
//                 <a href="#services" className="hero-button">
//                     Scopri cosa possiamo fare
//                 </a>
//             </div>
//         </section>
//     );
// }
//
// export default Hero;