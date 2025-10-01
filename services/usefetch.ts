import { useEffect, useState, useTransition } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchData = async () => {
    startTransition(async () => {
      try {
        setError(null);
        const result = await fetchFunction();
        
        // Check for API error responses
        if ((result as any)?.success === false) {
          const apiError = result as any;
          setError(new Error(apiError.status_message || "API Error"));
          return;
        }
        
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      }
    });
  };

  const reset = () => {
    setData(null);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading: isPending, error, refetch: fetchData, reset };
};

export default useFetch;