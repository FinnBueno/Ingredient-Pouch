import { useEffect, useRef, useState } from "react";

export const useDebouncedState: <T>(_initial: T) => [T, (_newState: T) => void] = <T>(initial: T) => {
    const [value, setValue] = useState<T>(initial);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const setDebounceValue = (newValue: T) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setValue(newValue);
        }, 1000);
    }

    useEffect(() => {
        return clearTimeout(timeoutRef.current);
    }, []);

    return [
        value,
        setDebounceValue
    ];
}