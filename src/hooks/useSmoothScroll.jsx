import {useCallback} from "react";

const useSmoothScroll = (offset = 90) => {
    return useCallback((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    }, [offset]);
};

export default useSmoothScroll;
