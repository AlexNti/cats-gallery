import { useEffect, useRef, useState, useCallback } from "react";
import { ApiSuccessOrError } from "@/types";
interface UseFetchOptions {
  fetchOnMount?: boolean;
}

export function useFetch<T = unknown>(
  fetchFn: () => Promise<ApiSuccessOrError<T>>,
  options: UseFetchOptions = {}
) {
  const { fetchOnMount } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  /**
   * We need to check if the component is mounted to avoid setting state on an unmounted component
   */
  const isMounted = useRef<boolean>(true);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await fetchFn();

    if (result.error) {
      setError(result.error.message);
      setData(null);
    } else {
      if (isMounted.current) {
        setData(result.data);
      }
    }
    setLoading(false);
    return { data: result.data, err: result.error };
  }, [fetchFn]);

  useEffect(() => {
    isMounted.current = true;

    if (fetchOnMount) {
      execute();
    }

    return () => {
      isMounted.current = false;
    };
  }, [execute, fetchOnMount]);

  return { data, loading, error, execute };
}
