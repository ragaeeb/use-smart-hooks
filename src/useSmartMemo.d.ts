/**
 * Type definition for the options object of the useSmartMemo hook.
 */
export interface UseSmartMemoOptions {
    /**
     * Optional deep equality check function.
     * If provided, it's used to determine if the new value is equal to the previous one.
     */
    isEqual?: (prev: any, next: any) => boolean;
}

/**
 * Custom hook that works like React's `useMemo`, but with additional optimizations.
 * It returns stable references for empty arrays and objects to prevent unnecessary re-renders.
 * If `options.isEqual` is provided, it also performs a deep equality check using that function.
 *
 * @param factory A function that returns the value to be memoized.
 * @param deps An array of dependencies for the memoization.
 * @param options Optional configuration object. This must be stable and will not trigger updates if changed.
 * @returns The memoized value.
 */
export function useSmartMemo<T>(factory: () => T, deps: ReadonlyArray<any>, options?: UseSmartMemoOptions): T;
