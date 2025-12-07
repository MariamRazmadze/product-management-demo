import { useSnapshot } from "valtio";
import { useState, useEffect, useRef } from "react";
import { AuthStore, AuthActions } from "../../stores/authStore";
import { useAuth } from "../../hooks/useAuth";
import ProfileHeader from "./ProfileHeader";
import AlertMessage from "../ui/AlertMessage";
import FormField from "../ui/FormField";
import { useTranslation } from "../../hooks/useTranslation";
import { profileSchema } from "../../schemas/profileSchema";
import { ZodError } from "zod";

export default function Profile() {
  const { updateProfile } = useAuth();
  const authState = useSnapshot(AuthStore);
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      AuthActions.clearMessages();
    };
  }, []);

  useEffect(() => {
    if (isEditing) {
      AuthActions.clearMessages();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    formRef.current?.reset();
    AuthActions.clearMessages();
    setValidationErrors({});
  };

  const handleSave = async (formData: FormData) => {
    const profileData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      username: formData.get("username") as string,
    };

    try {
      profileSchema.parse(profileData);
      setValidationErrors({});

      const success = await updateProfile(profileData);
      if (success) {
        setIsEditing(false);
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

  if (!authState.user) return null;

  return (
    <div className="min-h-screen transition-colors duration-300 bg-linear-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <form ref={formRef} action={handleSave}>
          <div className="rounded-2xl backdrop-blur-xl border transition-all duration-300 overflow-hidden bg-white/80 border-gray-200/50 shadow-xl shadow-blue-500/10 dark:bg-gray-800/50 dark:border-gray-700/50 dark:shadow-purple-500/10">
            <ProfileHeader
              user={authState.user}
              isEditing={isEditing}
              isLoading={authState.authStatus.isLoading}
              onEdit={handleEdit}
              onCancel={handleCancel}
            />

            <div className="px-8 pb-8">
              <AlertMessage
                message={authState.authStatus.message}
                error={authState.authStatus.error}
              />

              <div className="space-y-6">
                <FormField
                  id="firstName"
                  name="firstName"
                  label={t.profile?.firstName}
                  defaultValue={authState.user.firstName}
                  required
                  isEditing={isEditing}
                  error={validationErrors.firstName}
                />

                <FormField
                  id="lastName"
                  name="lastName"
                  label={t.profile?.lastName}
                  defaultValue={authState.user.lastName}
                  required
                  isEditing={isEditing}
                  error={validationErrors.lastName}
                />

                <FormField
                  id="email"
                  name="email"
                  label={t.profile?.email}
                  type="email"
                  defaultValue={authState.user.email}
                  required
                  isEditing={isEditing}
                  error={validationErrors.email}
                />

                <FormField
                  id="username"
                  name="username"
                  label={t.profile?.username}
                  defaultValue={authState.user.username}
                  required
                  isEditing={isEditing}
                  error={validationErrors.username}
                />

                <FormField
                  id="gender"
                  name="gender"
                  label={t.profile?.gender}
                  value={authState.user.gender}
                  disabled
                  isEditing={isEditing}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
