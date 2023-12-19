import { useMemo, useRef } from 'react';

import { EMPTY_ARRAY, EMPTY_OBJECT, isEmptyArray, isEmptyObject } from './common';

/**
 * Custom hook that works like React's `useMemo`, but with additional optimizations.
 * It returns stable references for empty arrays and objects to prevent unnecessary re-renders.
 * If `options.isEqual` is provided, it also performs a deep equality check using that function.
 * on the memoized value and returns a previous stable value if they are equal.
 *
 * @param {Function} factory - A function that returns the value to be memoized.
 * @param {Array} deps - An array of dependencies for the memoization. The factory function will
 *                       only re-run if the dependencies have changed.
 * @param {Object} [options] - Optional configuration object.
 * @param {Function} [options.isEqual] - If provided, performs a deep equality check
 *                                                       between the current and previous values using it.
 *                                                       Note: Changing the options object after
 *                                                       the initial render will not trigger
 *                                                       re-computation.
 * @returns {any} - The memoized value.
 *
 * @example
 * // Basic usage
 * const memoizedValue = useOptimizedMemo(() => computeExpensiveValue(a, b), [a, b]);
 *
 * @example
 * // With deep equality optimization
 * const memoizedComplexValue = useOptimizedMemo(() => computeComplexValue(a, b), [a, b], { isEqual: (a,b) => a.prop === b.prop });
 */
const useSmartMemo = (factory, deps, options = {}) => {
    const previousValueRef = useRef();

    return useMemo(() => {
        const result = factory();

        if (isEmptyArray(result)) {
            return EMPTY_ARRAY;
        }

        if (isEmptyObject(result)) {
            return EMPTY_OBJECT;
        }

        // Perform deep equality check if provided in options
        if (options.isEqual && previousValueRef.current && options.isEqual(previousValueRef.current, result)) {
            return previousValueRef.current;
        }

        // Update the ref with the new result and return it
        previousValueRef.current = result;
        return result;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};

export default useSmartMemo;
