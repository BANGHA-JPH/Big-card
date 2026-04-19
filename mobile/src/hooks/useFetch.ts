import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

interface UseFetchResponse<T> extends UseFetchState<T> {
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching data
 */
const useFetch = <T,>(
  fetchFunction: () => Promise<any>,
  dependencies: any[] = []
): UseFetchResponse<T> => {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const refetch = async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await fetchFunction();
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error as AxiosError,
      });
    }
  };

  useEffect(() => {
    refetch();
  }, dependencies);

  return {
    ...state,
    refetch,
  };
};

export default useFetch;
