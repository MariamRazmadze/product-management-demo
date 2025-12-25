import { loadToken, removeToken } from "../utils/storage";
import { AuthActions } from "../stores/authStore";
import { mapToUser } from "../utils/userMapper";
import { apiRequest } from "../utils/apiClient";
import type { User } from "../stores/types/user";

export const authService = {
  initializeAuth: async (): Promise<boolean> => {
    const token = loadToken();

    if (!token) {
      return false;
    }

    try {
      const userData = await apiRequest<User>({
        path: "/auth/me",
        token,
      });

      const user = mapToUser(userData, token);
      AuthActions.setUser(user);
      return true;
    } catch (error: any) {
      if (error?.message === "Unauthorized") {
        removeToken();
        return false;
      }
      console.error("Failed to initialize auth:", error);
      removeToken();
      return false;
    }
  },
};
