import { useNavigate } from "@tanstack/react-router";
import { removeToken } from "../utils/storage";
import { AuthActions } from "../stores/authStore";
import { apiRequest } from "../utils/apiClient";

type RequestOptions = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
  headers?: HeadersInit;
};

export const useApi = () => {
  const navigate = useNavigate();

  const resetAuthSession = async () => {
    removeToken();
    AuthActions.clearUser();
    await navigate({
      to: "/login",
      replace: true,
    });
  };

  const request = async <T>(options: RequestOptions): Promise<T> => {
    try {
      return await apiRequest<T>(options);
    } catch (error) {
      if (error instanceof Error && error.message === "Unauthorized") {
        await resetAuthSession();
      }
      throw error;
    }
  };

  return {
    get: <T>(path: string, options?: Omit<RequestOptions, "path" | "method">) =>
      request<T>({ path, ...options }),

    post: <T>(
      path: string,
      body: Record<string, unknown>,
      options?: Omit<RequestOptions, "path" | "method" | "body">
    ) => request<T>({ path, method: "POST", body, ...options }),

    put: <T>(
      path: string,
      body: Record<string, unknown>,
      options?: Omit<RequestOptions, "path" | "method" | "body">
    ) => request<T>({ path, method: "PUT", body, ...options }),

    del: (path: string, options?: Omit<RequestOptions, "path" | "method">) =>
      request<void>({ path, method: "DELETE", ...options }),
  };
};
