import { useState, useEffect } from "react";

export const useOutsideClick = (ref) => {
    const [outsideClecked, setOutsideClecked] = useState(false)

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOutsideClecked(true);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside, true);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside, true);
        };
    }, [ref]);

    return [outsideClecked, setOutsideClecked];

}