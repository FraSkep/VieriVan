import { useEffect, useRef } from "react";

const useFadeInOnScroll = (options = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add("fade-in-visible");
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.05,
                rootMargin: "0px 0px -10% 0px",
                ...options,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [options]);

    return ref;
};

export default useFadeInOnScroll;
