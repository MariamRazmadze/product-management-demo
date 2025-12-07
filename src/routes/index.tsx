import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthStore } from "../stores/authStore";
import { authService } from "../services/authService";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    if (AuthStore.isAuthenticated) {
      throw redirect({ to: "/products" });
    }
    const isAuthenticated = await authService.initializeAuth();

    if (isAuthenticated) {
      throw redirect({ to: "/products" });
    }

    throw redirect({ to: "/login" });
  },
});
