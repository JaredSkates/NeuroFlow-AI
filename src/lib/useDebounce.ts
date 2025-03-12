import React from 'react';

/* 
    Custom Hook for Debouncing
    - After typing stops, a specified timeout delay in (ms) runs, then the value is updated.
*/

// Pass in the editorState and a desired delay
export function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    // useEffect() handles the changes in value and delay. So when either changes, it sets a timeout.
    React.useEffect(() => {
        // Set a timeout to update the debounced value after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value); // Update debouncedValue
        }, delay)

        // Cleanup function to clear the timeout when the value or delay changes.
        return () => {
            clearTimeout(handler)
        };
    }, [value, delay]); // Dependencies for the effect

    // Return the debounced value
    return debouncedValue;
}