import { useEffect, useState } from "react";

/**
 * Retrieve a value with a delay
 */
const useDebounceValue = (value: any, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // cleanup
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounceValue;
