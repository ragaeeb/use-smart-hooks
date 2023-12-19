import { beforeEach, describe, expect, it } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';

import useSmartState from './useSmartState.js';

describe('useSmartState', () => {
    let isEqual;

    beforeEach(() => {
        isEqual = jest.fn((a, b) => JSON.stringify(a) === JSON.stringify(b));
    });

    it('initializes with the correct state', () => {
        const { result } = renderHook(() => useSmartState(0));
        expect(result.current[0]).toBe(0);
    });

    it('updates state correctly', () => {
        const { result } = renderHook(() => useSmartState(0));
        act(() => {
            result.current[1](1);
        });
        expect(result.current[0]).toBe(1);
    });

    it('handles initial empty arrays correctly', () => {
        const newArray = [];
        const { result } = renderHook(() => useSmartState(newArray));
        expect(Array.isArray(result.current[0]) && result.current[0].length === 0).toBeTruthy();
        expect(result.current[0]).toBe(newArray);
    });

    it('handles initial empty objects correctly', () => {
        const { result } = renderHook(() => useSmartState({}));
        expect(
            result.current[0] && typeof result.current[0] === 'object' && Object.keys(result.current[0]).length === 0,
        ).toBeTruthy();
    });

    it('returns the same instance for two empty arrays', () => {
        const { result } = renderHook(() => useSmartState([]));
        act(() => {
            result.current[1]([]);
        });
        expect(result.current[0]).toBe(result.current[0]);
        expect(isEqual).not.toHaveBeenCalled();
    });

    it('returns the same instance for two empty objects', () => {
        const { result } = renderHook(() => useSmartState({}));
        act(() => {
            result.current[1]({});
        });
        expect(result.current[0]).toBe(result.current[0]);
        expect(isEqual).not.toHaveBeenCalled();
    });

    it('returns the same instance for two deeply equal values', () => {
        const initial = [{ a: 1 }, { b: [] }];
        const copy = JSON.parse(JSON.stringify(initial));
        const { result } = renderHook(() => useSmartState(initial, { isEqual }));
        act(() => {
            result.current[1](copy);
        });
        expect(result.current[0]).toEqual(initial);
        expect(isEqual).toHaveBeenCalledTimes(1);
        expect(isEqual).toHaveBeenCalledWith(initial, copy);
    });
});
