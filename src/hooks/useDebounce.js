import { useState, useEffect } from "react";

function useDebounce(value, delay, callback) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            if (callback) {
                callback(value);
            }
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay, callback]);

    return debouncedValue;
}

export default useDebounce;
