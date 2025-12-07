type ButtonProps = React.ComponentProps<"button"> & {
  size?: "sm" | "default" | "lg";
  variant?: "default" | "success" | "warning" | "danger";
};

export default function Button({
  children,
  size = "default",
  variant = "default",
  className = "",
  ...rest
}: ButtonProps) {
  const sizeClasses =
    {
      sm: "px-3 py-1 text-xs",
      default: "px-4 py-1.5 text-sm",
      lg: "px-6 py-2.5 text-base",
    }[size] ?? "";

  const variantClasses =
    {
      default:
        "bg-gray-200/70 text-gray-800 border border-gray-400 shadow-sm hover:bg-gray-300",
      success:
        "bg-emerald-100 text-emerald-700 border border-emerald-600 hover:bg-emerald-200",
      warning:
        "bg-amber-100 text-amber-700 border border-amber-500 hover:bg-amber-200",
      danger: "bg-red-100 text-red-700 border border-red-500 hover:bg-red-200",
    }[variant] ?? "";

  return (
    <button
      {...rest}
      className={`rounded-lg font-medium transition-all duration-200 shadow-sm hover:scale-[1.03] active:scale-[0.97] ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
}
