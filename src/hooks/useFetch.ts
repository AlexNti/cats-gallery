import { useEffect, useRef, useState, useCallback } from "react";
import { ApiSuccessOrError } from "@/types";

type UseFetchOptions = {
  fetchOnMount?: boolean;
};

export function useFetch<T = unknown, Args = unknown>(
  fetchFn: (args: Args) => Promise<ApiSuccessOrError<T>>,
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

  const execute = useCallback(
    async (args?: Args) => {
      setLoading(true);
      setError(null);

      const result = await fetchFn(args as Args);

      setLoading(false);

      if (result.error) {
        setError(result.error.message);
        setData(null);
      } else {
        if (isMounted.current) {
          setData(result.data);
        }
      }
      return result;
    },
    [fetchFn]
  );

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
