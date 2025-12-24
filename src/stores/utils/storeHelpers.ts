export const createCommonActions = <
  T extends { isLoading: boolean; error: string },
>(
  store: T
) => ({
  setLoading: (isLoading: boolean) => {
    store.isLoading = isLoading;
  },

  setError: (error: string) => {
    store.error = error;
  },
});

export const createMessageActions = <
  T extends { error: string; message: string },
>(
  store: T
) => ({
  setMessage: (message: string) => {
    store.message = message;
  },

  clearMessages: () => {
    store.error = "";
    store.message = "";
  },
});
