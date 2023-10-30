import { KeyboardEvent, useState } from 'react';

export const useIndex = (initialValue?: number) => {
    const [index, setIndex] = useState(initialValue ?? 0);

    const handleIndex = (newIndex: number) => {
        setIndex(newIndex);
    };

    return [index, handleIndex];
};

export const useEnter = (func: () => void) => {
    return (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            func();
        }
    };
};
