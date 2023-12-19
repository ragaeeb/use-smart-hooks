/**
 * Type definition for the options object of the useSmartState hook.
 */
export interface UseSmartStateOptions {
    /**
     * Optional deep equality check function.
     * If provided, it's used to determine if the new value is equal to the previous one.
     */
    isEqual?: (prev: any, next: any) => boolean;
}

/**
 * Custom hook for managing state with optimization for empty arrays and objects.
 * It returns the previous state if the new value is deeply equal to the previous one.
 *
 * @param initialValue The initial state value.
 * @param options Optional settings for the hook. This must be stable and will not trigger updates if changed.
 * @returns An array with two elements:
 *          1. The current state.
 *          2. A function to update the state. This function uses the `isEqual` function for deep comparisons if provided.
 */
export function useSmartState<T>(initialValue: T, options?: UseSmartStateOptions): [T, (newVal: T) => void];
