type AlertType = "success" | "error" | "info" | "warning";

type AlertMessageProps = {
  message?: string;
  error?: string;
  type?: AlertType;
  className?: string;
};

export default function AlertMessage({
  message,
  error,
  type,
  className = "",
}: AlertMessageProps) {
  if (!message && !error) return null;

  const displayMessage = error || message;

  let alertType: AlertType = type || "info";
  if (error) {
    alertType = "error";
  } else if (message?.includes("success")) {
    alertType = "success";
  } else if (!type) {
    alertType = "error";
  }

  const styles = {
    success:
      "bg-green-50 border-green-200 text-green-800 dark:bg-green-500/10 dark:border-green-500/30 dark:text-green-300",
    error:
      "bg-red-50 border-red-200 text-red-800 dark:bg-red-500/10 dark:border-red-500/30 dark:text-red-300",
    warning:
      "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-500/10 dark:border-yellow-500/30 dark:text-yellow-300",
    info:
      "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-300",
  };

  return (
    <div
      className={`mb-4 rounded-xl p-3 border text-sm transition-colors ${styles[alertType]} ${className}`}
    >
      {displayMessage}
    </div>
  );
}
