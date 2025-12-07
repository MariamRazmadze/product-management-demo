import { proxy } from "valtio";
import type { User, AuthProps } from "./types/user";

const initialState: AuthProps = {
  user: null,
  isAuthenticated: false,
  authStatus: {
    isLoading: false,
    isSuccess: false,
    error: "",
    message: "",
  },
};

export const AuthStore = proxy<AuthProps>(initialState);

export const AuthActions = {
  setUser: (user: User) => {
    AuthStore.user = user;
    AuthStore.isAuthenticated = true;
    AuthStore.authStatus.isSuccess = true;
    AuthStore.authStatus.error = "";
  },

  clearUser: () => {
    AuthStore.user = null;
    AuthStore.isAuthenticated = false;
    AuthStore.authStatus.isSuccess = false;
    AuthStore.authStatus.error = "";
    AuthStore.authStatus.message = "";
  },

  setLoading: (isLoading: boolean): void => {
    AuthStore.authStatus.isLoading = isLoading;
  },

  setError: (message: string): void => {
    AuthStore.authStatus.error = message;
    AuthStore.authStatus.isSuccess = false;
  },

  setMessage: (message: string): void => {
    AuthStore.authStatus.message = message;
  },

  clearMessages: (): void => {
    AuthStore.authStatus.message = "";
    AuthStore.authStatus.error = "";
  },
};
