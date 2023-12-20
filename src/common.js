export const EMPTY_ARRAY = [];
export const EMPTY_OBJECT = {};

export const isEmptyObject = (obj) => obj && typeof obj === 'object' && Object.keys(obj).length === 0;

export const isEmptyArray = (arr) => Array.isArray(arr) && arr.length === 0;

export const isValueEmpty = (value, previousValue) => {
    // If new value is also an empty array just like the last, return the same instance
    if (isEmptyArray(value)) {
        if (!isEmptyArray(previousValue)) {
            return EMPTY_ARRAY;
        }

        return previousValue;
    }

    // If new value is also an empty object just like the last, return the same instance
    if (isEmptyObject(value)) {
        if (!isEmptyObject(previousValue)) {
            return EMPTY_OBJECT;
        }

        return previousValue;
    }

    return null;
};
