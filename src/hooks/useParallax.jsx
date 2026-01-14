import { useEffect } from "react";

const useParallax = (ref, intensity = 0.15) => {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.bottom >= 0 && rect.top <= windowHeight) {
                const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
                const translate = (scrollProgress - 0.5) * intensity * 100;

                element.style.setProperty(
                    "--parallax-translate",
                    `${translate}px`
                );
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [ref, intensity]);
};

export default useParallax;
