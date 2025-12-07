type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg" | "xl";
  centered?: boolean;
  className?: string;
};

export default function LoadingSpinner({
  size = "md",
  centered = false,
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-12 w-12 border-b-2",
    lg: "h-16 w-16 border-b-2",
    xl: "h-20 w-20 border-b-2",
  };

  const spinner = (
    <div
      className={`animate-spin rounded-full ${sizeClasses[size]} border-blue-500 dark:border-purple-500 ${className}`}
      role="status"
      aria-label="Loading"
    />
  );

  if (centered) {
    return (
      <div className="flex justify-center items-center py-12">{spinner}</div>
    );
  }

  return spinner;
}
