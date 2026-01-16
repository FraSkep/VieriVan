import "./Header.css";
import { useEffect, useState } from "react";
import useSmoothScroll from "../../hooks/useSmoothScroll";
// import logo from "../../assets/vieriVanLogo.png";
import logo from "../../assets/loghi/logo1t.png";
import miniLogo from "../../assets/loghi/logo4t.png"

const sections = ["hero", "services", "gallery", "testimonials", "contact"];

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const [menuOpen, setMenuOpen] = useState(false);
    const scrollToSection = useSmoothScroll(90);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);

            sections.forEach((id) => {
                const section = document.getElementById(id);
                if (!section) return;

                const rect = section.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    setActiveSection(id);
                }
            });
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <header className={`header ${scrolled ? "scrolled" : ""}`}>
            <div className="header-content">
                <img src={logo} alt="VieriVan" className="header-logo" />
                <div></div>

                {/* DESKTOP NAV */}
                <nav className="nav desktop-nav">
                    {sections.map((section) => (
                        <a
                            key={section}
                            onClick={() => scrollToSection(section)}
                            className={activeSection === section ? "active" : ""}
                        >
                            {section === "hero" && "Home"}
                            {section === "services" && "Servizi"}
                            {section === "gallery" && "Lavori"}
                            {section === "testimonials" && "Testimonianze"}
                            {section === "contact" && "Contatti"}
                        </a>
                    ))}
                </nav>
                <img src={miniLogo} alt="VieriVanLogo" className="header-logo" />

                {/* HAMBURGER */}
                <div
                    className={`hamburger ${menuOpen ? "open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            {/* MOBILE MENU */}
            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                {sections.map((section) => (
                    <a
                        key={section}
                        href={`#${section}`}
                        onClick={handleLinkClick}
                        className={activeSection === section ? "active" : ""}
                    >
                        {section === "hero" && "Home"}
                        {section === "services" && "Servizi"}
                        {section === "gallery" && "Lavori"}
                        {section === "testimonials" && "Testimonianze"}
                        {section === "contact" && "Contatti"}
                    </a>
                ))}
            </div>
        </header>
    );
}

export default Header;
