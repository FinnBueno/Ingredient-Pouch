import { useEffect, useRef, useState } from "react";

export const useDebouncedState: <T>(_initial: T, _debounceTime?: number) => [T, (_newState: T) => void] = <T>(initial: T, debounceTime = 1000) => {
    const [value, setValue] = useState<T>(initial);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const setDebounceValue = (newValue: T) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setValue(newValue);
        }, debounceTime);
    }

    useEffect(() => {
        return clearTimeout(timeoutRef.current);
    }, []);

    return [
        value,
        setDebounceValue
    ];
}