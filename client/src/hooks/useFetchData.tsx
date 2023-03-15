import { useState, useEffect } from "react";

export function isError(e: unknown): e is Error {
  return (e as Error).message !== undefined;
}

export function useFetchData<TResponse>(url: string) {
  const [data, setData] = useState<TResponse>();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (response.status === 200) {
          const json = await response.json();
          setData(json);
        }
        setIsFetching(false);
        setStatus(response.status);
      } catch (e: unknown) {
        if (isError(e)) {
          setError(e.message);
        }
        setIsFetching(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isFetching, error, status };
}