import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSnapshot } from "valtio";
import { useTranslation } from "../../hooks/useTranslation";
import { useAuth } from "../../hooks/useAuth";
import { AuthStore } from "../../stores/authStore";
import Button from "../../components/ui/Button";
import { loginSchema } from "../../schemas/authSchema";
import { ZodError } from "zod";

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const authState = useSnapshot(AuthStore);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleLogin = async (formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      loginSchema.parse({ username, password });
      setValidationErrors({});

      const success = await login(username, password);

      if (success) {
        navigate({ to: "/products" });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            errors[issue.path[0] as string] = issue.message;
          }
        });
        setValidationErrors(errors);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 bg-linear-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 pb-2 text-center text-3xl font-extrabold transition-colors text-gray-900 dark:bg-linear-to-r dark:from-purple-400 dark:to-pink-400 dark:bg-clip-text dark:text-transparent dark:px-2">
            {t.profile?.login}
          </h1>
          <p className="mt-2 text-center text-sm transition-colors text-gray-600 dark:text-gray-400">
            {t.profile.demos}: emilys / emilyspass
          </p>
        </div>

        <form
          className="mt-8 space-y-6 p-8 rounded-2xl backdrop-blur-xl border transition-all duration-300 bg-white/80 border-gray-200/50 shadow-2xl shadow-blue-500/10 dark:bg-gray-800/50 dark:border-gray-700/50 dark:shadow-purple-500/10"
          action={handleLogin}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-2 transition-colors text-gray-700 dark:text-gray-300"
              >
                {t.profile?.username || "Username"}
              </label>
              <input
                type="text"
                name="username"
                id="username"
                defaultValue="emilys"
                className={`appearance-none relative block w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:z-10 sm:text-sm transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 dark:bg-gray-900/50 dark:text-gray-100 dark:placeholder-gray-500 ${
                  validationErrors.username
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                }`}
                placeholder="Enter username"
                disabled={authState.authStatus.isLoading}
              />
              {validationErrors.username && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {validationErrors.username}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 transition-colors text-gray-700 dark:text-gray-300"
              >
                {t.profile?.password || "Password"}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                defaultValue="emilyspass"
                className={`appearance-none relative block w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:z-10 sm:text-sm transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 dark:bg-gray-900/50 dark:text-gray-100 dark:placeholder-gray-500 ${
                  validationErrors.password
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                }`}
                placeholder="Enter password"
                disabled={authState.authStatus.isLoading}
              />
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {validationErrors.password}
                </p>
              )}
            </div>
          </div>

          {authState.authStatus.error && (
            <div className="rounded-xl p-4 border transition-colors bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/30">
              <p className="text-sm text-red-800 dark:text-red-300">
                {authState.authStatus.error}
              </p>
            </div>
          )}

          {authState.authStatus.message && (
            <div className="rounded-xl p-4 border transition-colors bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/30">
              <p className="text-sm text-green-800 dark:text-green-300">
                {authState.authStatus.message}
              </p>
            </div>
          )}

          <div>
            <Button
              variant="success"
              size="sm"
              type="submit"
              disabled={authState.authStatus.isLoading}
              className="w-full flex justify-center"
            >
              {authState.authStatus.isLoading
                ? t.profile?.signingIn
                : t.profile?.signIn}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm transition-colors text-gray-600 dark:text-gray-400">
          <p className="font-medium mb-1">{t.profile?.tests}:</p>
          <p>sophiab / sophiabpass</p>
        </div>
      </div>
    </div>
  );
}
