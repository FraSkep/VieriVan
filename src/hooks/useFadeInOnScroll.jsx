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
                threshold: 0.2,
                ...options,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [options]);

    return ref;
};

export default useFadeInOnScroll;
