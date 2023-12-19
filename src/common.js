export const EMPTY_ARRAY = [];
export const EMPTY_OBJECT = {};

export const isEmptyObject = (obj) => obj && typeof obj === 'object' && Object.keys(obj).length === 0;

export const isEmptyArray = (arr) => Array.isArray(arr) && arr.length === 0;
