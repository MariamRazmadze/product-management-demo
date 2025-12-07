import { redirect } from "@tanstack/react-router";
import { AuthStore } from "../stores/authStore";
import { authService } from "../services/authService";

export async function requireAuth() {
  if (AuthStore.isAuthenticated) {
    return;
  }
  const isAuthenticated = await authService.initializeAuth();

  if (!isAuthenticated) {
    throw redirect({ to: "/login", replace: true });
  }
}
