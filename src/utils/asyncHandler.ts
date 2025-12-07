type AsyncOperation<T> = () => Promise<T>;

type AsyncHandlerOptions = {
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  errorMessage?: string;
};

export async function handleAsync<T>(
  operation: AsyncOperation<T>,
  options: AsyncHandlerOptions
): Promise<T | null> {
  const { setLoading, setError, errorMessage = "Operation failed" } = options;

  try {
    setLoading(true);
    setError("");
    return await operation();
  } catch (error) {
    const message = error instanceof Error ? error.message : errorMessage;
    setError(message);
    return null;
  } finally {
    setLoading(false);
  }
}
