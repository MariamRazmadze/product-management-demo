import Button from "../../ui/Button";
import { useTranslation } from "../../../hooks/useTranslation";

type ProfileHeaderProps = {
  user: {
    image: string;
    username: string;
    firstName: string;
    lastName: string;
  };
  isEditing: boolean;
  isLoading: boolean;
  onEdit: () => void;
  onCancel: () => void;
};

export default function ProfileHeader({
  user,
  isEditing,
  isLoading,
  onEdit,
  onCancel,
}: ProfileHeaderProps) {
  const { t } = useTranslation();
  return (
    <>
      <div
        className="relative h-32 bg-linear-to-r from-blue-500 to-purple-500 dark:from-purple-900/50 dark:to-pink-900/50"
      >
        <div className="absolute -bottom-16 left-8">
          <div
            className="relative rounded-full p-1 bg-white dark:bg-linear-to-r dark:from-purple-500 dark:to-pink-500"
          >
            <img
              src={user.image}
              alt={user.username}
              className="h-32 w-32 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="pt-20 pb-8 px-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2
              className="text-3xl font-bold transition-colors text-gray-900 dark:bg-linear-to-r dark:from-purple-400 dark:to-pink-400 dark:bg-clip-text dark:text-transparent"
            >
              {user.firstName} {user.lastName}
            </h2>
            <p
              className="text-sm mt-1 transition-colors text-gray-600 dark:text-gray-400"
            >
              @{user.username}
            </p>
          </div>
          {!isEditing ? (
            <Button type="button" variant="success" size="sm" onClick={onEdit}>
              {t.profile?.editProfile}
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                type="button"
                variant="warning"
                size="sm"
                onClick={onCancel}
                disabled={isLoading}
              >
                {t.common?.cancel}
              </Button>
              <Button
                type="submit"
                variant="success"
                size="sm"
                disabled={isLoading}
              >
                {isLoading ? t.common?.saving : t.profile?.saveChanges}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
