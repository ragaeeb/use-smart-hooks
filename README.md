# use-smart-hooks

`use-smart-hooks` is a React hooks library designed to minimize unnecessary re-renders, enhancing the performance of your React applications. This library provides custom hooks like `useSmartState` and `useSmartMemo` as alternatives to React's built-in hooks with additional optimizations. The hooks are a drop-in replacement for the existing `useState` and `useMemo` hooks, with additional options like `isEqual` for advanced performance enhancements.

## Table of Contents

1. [Installation](#installation)
2. [Benefits](#benefits)
3. [API](#api)
    - [useSmartState](#usesmartstate)
    - [useSmartMemo](#usesmartmemo)
4. [Examples](#examples)
5. [License](#license)

## Installation

To install `use-smart-hooks`, run the following command:

```sh
npm install use-smart-hooks
```

## Benefits

`use-smart-hooks` offers enhanced performance by reducing unnecessary re-renders. This is particularly beneficial in complex applications where state or memoized values frequently change. By ensuring stability in returned references and values, these hooks help in avoiding needless updates, leading to more efficient rendering.

## API

### useSmartState

`useSmartState` works similarly to React's `useState` but provides a stable reference for deeply equal values.

#### Syntax

Instead of the standard React's hooks which will re-render empty objects or arrays again even though they are deeply equal:

```javascript
const [items, setItems] = useState([]);
const [object, setObject] = useState({});

// the following will cause unnecessary re-renders
setItems([]);
setObject({});
```

use the smart hooks:

```javascript
const [items, setItems] = useSmartState([]);
const [object, setObject] = useSmartState({});

// the following will not cause re-renders
setItems([]);
setObject({});
```

#### Parameters

-   `initialValue` - The initial state value.
-   `options` - An optional object containing a custom deep equality function.

#### Example

```javascript
import { useSmartState } from 'use-smart-hooks';

const MyComponent = () => {
    const [state, setSmartState] = useSmartState({ key: 'value' });
    // ...
};
```

### useSmartMemo

`useSmartMemo` is an alternative to `useMemo` with additional checks for deep equality.

#### Syntax

```javascript
const memoizedValue = useSmartMemo(factory, deps, options);

// if the factory returns an {} or [], it will always return stable values for these so that there are no unnecessary re-renders.
```

#### Parameters

-   `factory` - A function that returns the value to be memoized.
-   `deps` - Dependency array for memoization.
-   `options` - Optional configuration object with `isEqual` function for deep equality check. This is a great place to use something like [fast-equals](https://github.com/planttheidea/fast-equals)

#### Example

```javascript
import { useSmartMemo } from 'use-smart-hooks';

const expensiveComputation = () => {
    /* ... */
};
const memoizedResult = useSmartMemo(expensiveComputation, [dependency]);
```

## Examples

### useSmartState Example

```javascript
const [state, setSmartState] = useSmartState(0);
setSmartState(1); // this will trigger a re-render

const [complexState, setComplexState] = useSmartState(
    { a: [], b: [] },
    { isEqual: (a, b) => JSON.stringify(a) === JSON.stringify(b) },
);
```

### useSmartMemo Example

```javascript
const memoizedValue = useSmartMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### useSmartMemo Deep Equality Example

```javascript
// this will always return a stable empty array that will not cause re-renders even if the a,b dependencies change
const memoizedEmptyArray = useSmartMemo(() => [1, 2].filter((n) => n > 2), [a, b]);
const memoizedEmptyObject = useSmartMemo(() => {
    const result = { a: 1 };
    delete result.a;

    // this will always return a stable empty object that will not cause re-renders even if the a,b dependencies change
    return result;
}, [a, b]);

// this will return a stable object of {x: 1, y: 1} even if the a,b dependencies change
const memoizedObject = useSmartMemo(
    () => {
        const result = { x: 1 };
        return { ...result, y: 1 };
    },
    [e, f],
    { isEqual: (a, b) => JSON.stringify(a) === JSON.stringify(b) },
);
```

## License

`use-smart-hooks` is MIT licensed.
