import { useCallback, useRef, useState } from 'react';

import { EMPTY_ARRAY, EMPTY_OBJECT, isEmptyArray, isEmptyObject } from './common';

/**
 * Custom hook for managing state with optimization for empty arrays and objects.
 * It returns the previous state if the new value is deeply equal to the previous one.
 *
 * @param {any} initialValue - The initial state value.
 * @param {Object} [options] - Optional settings.
 * @param {Function} [options.isEqual] - Optional deep equality check function.
 *                                        If provided, it's used to determine if the new value is equal to the previous one.
 * @returns {[any, Function]} An array with two elements:
 *                            1. The current state.
 *                            2. A function to update the state. This function uses the `isEqual` function for deep comparisons if provided.
 */
const useSmartState = (initialValue, options) => {
    const [state, setState] = useState(initialValue);
    const previousValueRef = useRef(initialValue);

    const setSmartState = useCallback((newVal) => {
        setState((prev) => {
            // If new value is also an empty array just like the last, return the same instance
            if (isEmptyArray(newVal)) {
                previousValueRef.current = EMPTY_ARRAY;
                return EMPTY_ARRAY;
            }

            // If new value is also an empty object just like the last, return the same instance
            if (isEmptyObject(newVal)) {
                previousValueRef.current = EMPTY_OBJECT;
                return EMPTY_OBJECT;
            }

            if (options?.isEqual && options.isEqual(prev, newVal)) {
                return prev;
            }

            // Value changed, update the ref with the new value
            previousValueRef.current = newVal;
            return newVal;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [state, setSmartState];
};

export default useSmartState;
