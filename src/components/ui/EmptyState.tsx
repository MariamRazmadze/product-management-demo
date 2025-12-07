import type { ReactNode } from "react";

type EmptyStateProps = {
  message: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export default function EmptyState({
  message,
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`text-center py-12 rounded-2xl border bg-white/80 border-gray-200/50 dark:bg-gray-800/50 dark:border-gray-700/50 ${className}`}
    >
      {icon && <div className="flex justify-center mb-4">{icon}</div>}
      <p
        className="text-lg text-gray-600 dark:text-gray-300"
      >
        {message}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
