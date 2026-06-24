import { useState, useEffect, useRef, useCallback } from "react";

const cache = new Map();

export function useFetch(fetcher, deps = [], { debounce = 0 } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);
  const timerRef = useRef(null);
  const cacheKey = JSON.stringify(deps);

  const run = useCallback(() => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (cache.has(cacheKey)) {
      setData(cache.get(cacheKey));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetcher(controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) {
          cache.set(cacheKey, result);
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err.message);
          setLoading(false);
        }
      });
  }, [cacheKey]);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (debounce > 0) {
      timerRef.current = setTimeout(run, debounce);
    } else {
      run();
    }
    return () => {
      clearTimeout(timerRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [run, debounce]);

  return { data, loading, error, refetch: run };
}
