import { proxy } from "valtio";
import type { User, AuthProps } from "./types/user";
import {
  createCommonActions,
  createMessageActions,
} from "./utils/storeHelpers";

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

  ...createCommonActions(AuthStore.authStatus),
  ...createMessageActions(AuthStore.authStatus),
};
