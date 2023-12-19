import { act, renderHook } from '@testing-library/react';

import useSmartMemo from './useSmartMemo.js';

describe('useSmartMemo', () => {
    let isEqual;

    beforeEach(() => {
        isEqual = jest.fn((a, b) => JSON.stringify(a) === JSON.stringify(b));
    });

    it('uses isEqual for deep equality checks', () => {
        const initialObject = { a: 1 };
        const newObject = { a: 1 };
        const factory = jest.fn().mockReturnValueOnce(initialObject).mockReturnValue(newObject);

        // Initial render
        let dep = 1;
        const { result, rerender } = renderHook(() => useSmartMemo(factory, [dep], { isEqual }));

        // Change the dependency to trigger recomputation
        dep = 2;
        act(() => {
            rerender(() => useSmartMemo(factory, [dep], { isEqual }));
        });

        expect(factory).toHaveBeenCalledTimes(2);
        expect(isEqual).toHaveBeenCalledWith(initialObject, newObject);
        expect(result.current).toBe(initialObject); // Expect the same reference since the objects are deeply equal
    });

    it('returns stable reference for empty array', () => {
        const factory = () => [];
        const { result, rerender } = renderHook(() => useSmartMemo(factory, []));

        const firstResult = result.current;
        rerender();

        expect(result.current).toBe(firstResult); // Same instance for empty array
    });

    it('returns stable reference for empty object', () => {
        const factory = () => ({});
        const { result, rerender } = renderHook(() => useSmartMemo(factory, []));

        const firstResult = result.current;
        rerender();

        expect(result.current).toBe(firstResult); // Same instance for empty object
    });

    it('returns new value when dependencies change', () => {
        const factory = jest.fn(() => ({ a: 1 }));
        let dep = 1;
        const { result, rerender } = renderHook(() => useSmartMemo(factory, [dep]));

        const firstResult = result.current;

        dep = 2; // Change dependency to trigger recomputation
        act(() => {
            rerender();
        });

        expect(factory).toHaveBeenCalledTimes(2);
        expect(result.current).not.toBe(firstResult);
        expect(result.current).toEqual({ a: 1 });
    });

    it('does not use isEqual when not provided', () => {
        const initialObject = { a: 1 };
        const newObject = { a: 1 };
        const factory = jest.fn().mockReturnValueOnce(initialObject).mockReturnValueOnce(newObject);

        let dep = 1;
        const { result, rerender } = renderHook(() => useSmartMemo(factory, [dep]));

        dep = 2; // Change dependency to trigger recomputation
        act(() => {
            rerender();
        });

        expect(factory).toHaveBeenCalledTimes(2);
        expect(result.current).not.toBe(initialObject);
        expect(result.current).toEqual(newObject);
    });
});
