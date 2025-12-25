import { AuthActions, AuthStore } from "../stores/authStore";
import { CartActions } from "../stores/cartStore";
import { useApi } from "./useApi";
import { saveToken, removeToken } from "../utils/storage";
import type { User, LoginResponse } from "../stores/types/user";
import { handleAsync } from "../utils/asyncHandler";
import { mapToUser } from "../utils/userMapper";

export const useAuth = () => {
  const api = useApi();

  const login = async (username: string, password: string) => {
    const result = await handleAsync(
      async () => {
        const data = await api.post<LoginResponse>("/auth/login", {
          username,
          password,
          expiresInMins: 30,
        });

        const user = mapToUser(data);

        saveToken(user.accessToken);
        AuthActions.setUser(user);
        AuthActions.setMessage("Login successful!");

        return true;
      },
      {
        setLoading: AuthActions.setLoading,
        setError: AuthActions.setError,
        errorMessage: "Login failed unexpectedly",
      }
    );

    return result ?? false;
  };

  const logout = () => {
    removeToken();
    AuthActions.clearUser();
    CartActions.clearCart();
  };

  const getCurrentUser = async () => {
    if (!AuthStore.user?.accessToken) {
      return null;
    }

    try {
      return await api.get<User>("/auth/me");
    } catch (error) {
      console.error("Failed to get current user:", error);
      logout();
      return null;
    }
  };

  const updateProfile = async (profileData: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
  }) => {
    if (!AuthStore.user) return false;

    const result = await handleAsync(
      async () => {
        const updatedUser = await api.put<User>(
          `/users/${AuthStore.user!.id}`,
          profileData
        );
        const user: User = {
          ...AuthStore.user!,
          firstName: updatedUser.firstName || profileData.firstName,
          lastName: updatedUser.lastName || profileData.lastName,
          email: updatedUser.email || profileData.email,
          username: updatedUser.username || profileData.username,
        };

        AuthActions.setUser(user);
        AuthActions.setMessage("Profile updated successfully!");
        return true;
      },
      {
        setLoading: AuthActions.setLoading,
        setError: AuthActions.setError,
        errorMessage: "Failed to update profile",
      }
    );

    return result ?? false;
  };

  return {
    login,
    logout,
    getCurrentUser,
    updateProfile,
  };
};
