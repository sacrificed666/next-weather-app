import { useState, useEffect } from "react";

const useAPI = <T>(api: string, city: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trimmed = city.trim();
    if (!trimmed) return;

    const controller = new AbortController();

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/${api}?city=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Failed to fetch ${api} data`);
        const json: T = await response.json();
        setData(json);
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [api, city]);

  return { data, loading, error };
};

export default useAPI;
