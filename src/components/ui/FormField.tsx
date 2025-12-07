type FormFieldProps = {
  id?: string;
  name: string;
  label: string;
  type?: "text" | "number" | "email" | "password" | "textarea";
  defaultValue?: string | number;
  value?: string | number;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  placeholder?: string;
  isEditing?: boolean;
  error?: string;
};

export default function FormField({
  id,
  name,
  label,
  type = "text",
  defaultValue,
  value,
  disabled = false,
  required = false,
  rows = 3,
  min,
  max,
  step,
  placeholder,
  isEditing = true,
  error,
}: FormFieldProps) {
  const fieldId = id || name;
  const isFieldDisabled = disabled || !isEditing;

  const baseInputClasses =
    "w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all";

  const getInputClasses = () => {
    if (error) {
      return `${baseInputClasses} bg-white border-red-500 text-gray-900 focus:ring-red-500 focus:border-red-500 dark:bg-gray-900/50 dark:border-red-500 dark:text-gray-100`;
    }
    return `${baseInputClasses} ${
      isEditing && !disabled
        ? "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900/50 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-purple-500 dark:focus:border-purple-500"
        : "bg-gray-50 border-gray-200 text-gray-900 cursor-not-allowed dark:bg-gray-900/30 dark:border-gray-700 dark:text-gray-200"
    }`;
  };

  const inputClasses = getInputClasses();
  const textareaClasses = `${inputClasses} resize-none`;

  const labelClasses = "block text-sm font-medium mb-2 transition-colors text-gray-700 dark:text-gray-300";

  const commonProps = {
    id: fieldId,
    name,
    defaultValue,
    value,
    disabled: isFieldDisabled,
    required,
    placeholder,
  };

  return (
    <div>
      <label htmlFor={fieldId} className={labelClasses}>
        {label} {required && "*"}
      </label>

      {type === "textarea" ? (
        <textarea {...commonProps} rows={rows} className={textareaClasses} />
      ) : (
        <input
          {...commonProps}
          type={type}
          min={min}
          max={max}
          step={step}
          className={inputClasses}
        />
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
