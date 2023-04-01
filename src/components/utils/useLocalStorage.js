import { useState, useEffect } from "react";

function useLocalState(defaultValue, key) {
    const [value, setValue] = useState(null);

    useEffect(() => {
        const localStorageValue = localStorage.getItem(key);

        setValue(localStorageValue !== null ? JSON.parse(localStorageValue) : defaultValue)
    }, [])

    useEffect(() => {
        if (value !== null) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value])

    return [value, setValue];
}

export {useLocalState}