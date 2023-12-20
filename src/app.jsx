import { h } from "preact";
import { useState } from "preact/hooks";
import { useSmartState, useSmartMemo } from "use-smart-hooks";
import "./app.css";
import packageInfo from "../package.json";
import { useCallback, useEffect, useRef } from "react";

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const DEFAULT_VALUE = `[{"d": "Duck"}, {"e": "Elephant"}]`;
const FILTER_TEXT = 'x';

export function App() {
  const [stateUpdateCount, setStateUpdateCount] = useState(0);
  const [memoUpdateCount, setMemoUpdateCount] = useState(0);
  const textRef = useRef();
  const [state, setState] = useSmartState(JSON.parse(DEFAULT_VALUE), { isEqual });

  useEffect(() => {
    document.title = packageInfo.name;
  }, []);

  useEffect(() => {
    setStateUpdateCount((prev) => prev + 1);
  }, [state]);

  const filteredData = useSmartMemo(() => {
    if (Array.isArray(state)) {
      return state.filter((item) => !JSON.stringify(item).includes(FILTER_TEXT));
    }

    return Object.entries(state).filter((pair) => !JSON.stringify(pair).includes(FILTER_TEXT));
  }, [state], { isEqual });

  useEffect(() => {
    setMemoUpdateCount((prev) => prev + 1);
  }, [filteredData]);

  const handleProcessText = useCallback(() => {
    try {
      setState(JSON.parse(textRef.current.value));
    } catch (error) {
      alert("Error parsing rules or processing text: " + error.message);
    }
  }, []);

  return (
    <div>
      <h1>{packageInfo.name} by {packageInfo.author} v{packageInfo.dependencies["use-smart-hooks"]} Demo</h1>
      <div>
        State updated {stateUpdateCount} times, memoized value updated {memoUpdateCount} times
        <textarea
          ref={textRef}
          style={{ minWidth: "100%" }}
          onFocus={((e) => {
            if (!e.target.value) {
              e.target.value = DEFAULT_VALUE;
            }
          })}
          placeholder="Write some JSON to parse. If the parsed JSON deeply equals the last value, there should not be any updates to the state count. If any of the elements in the JSON contains the text 'x', it will filter it out. If the filtered data ends up being the same as last, there should not be any update to the memoized count."
        />
        <textarea
          style={{ minWidth: "100%" }}
          disabled
          value={JSON.stringify(filteredData)}
        />
        <button onClick={handleProcessText}>Process Text</button>
      </div>
    </div>
  );
}
