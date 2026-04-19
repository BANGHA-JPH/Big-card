import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

interface UseApiResponse<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for API calls
 */
const useApi = <T>(
  apiFunction: (...args: any[]) => Promise<any>,
  immediate: boolean = false
): UseApiResponse<T> => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState({ data: null, loading: true, error: null });
      try {
        const response = await apiFunction(...args);
        setState({
          data: response.data,
          loading: false,
          error: null,
        });
        return response.data;
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error as AxiosError,
        });
        throw error;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};

export default useApi;
