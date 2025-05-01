
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { PasswordInput } from "@/components/auth/PasswordInput";

/**
 * Form field component with built-in validation and error handling
 * 
 * @component
 * @param {object} props
 * @param {string} props.id - Unique identifier for the input field
 * @param {string} [props.label] - Label text
 * @param {string} [props.type='text'] - Input type (text, email, password, etc)
 * @param {string} [props.placeholder] - Input placeholder text
 * @param {string} [props.value] - Input value
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - Change handler
 * @param {(value: string) => string | undefined} [props.validate] - Validation function
 * @param {string} [props.error] - Error message to display
 * @param {string} [props.hint] - Hint text to display below input
 * @param {string} [props.successMessage] - Success message to display when validation passes
 * @param {boolean} [props.required=false] - Whether the field is required
 * @param {boolean} [props.disabled=false] - Whether the field is disabled
 * @param {string} [props.className] - Additional CSS classes for the container
 * @param {boolean} [props.showPasswordStrength=false] - Show password strength indicator (only for password fields)
 */
export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  validate,
  error,
  hint,
  successMessage,
  required = false,
  disabled = false,
  className,
  showPasswordStrength = false,
  ...props
}: {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: (value: string) => string | undefined;
  error?: string;
  hint?: string;
  successMessage?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  showPasswordStrength?: boolean;
  [key: string]: any;
}) {
  const [touched, setTouched] = useState(false);
  const [localError, setLocalError] = useState<string | undefined>();
  
  // Combine external and local validation
  const errorMessage = error || (touched && localError);
  
  // Determine if field has been successfully validated
  const isValid = touched && value && !errorMessage && (successMessage !== undefined);

  const handleBlur = () => {
    setTouched(true);
    if (validate) {
      setLocalError(validate(value));
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label 
          htmlFor={id}
          className="text-sm font-medium flex justify-between"
        >
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}

      <div className="relative">
        {type === "password" ? (
          <PasswordInput
            id={id}
            value={value}
            onChange={onChange}
            showStrengthMeter={showPasswordStrength}
            required={required}
            disabled={disabled}
            {...props}
          />
        ) : (
          <Input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={cn(
              errorMessage && "border-destructive focus-visible:ring-destructive/30",
              isValid && "border-green-500 focus-visible:ring-green-500/30"
            )}
            aria-invalid={errorMessage ? "true" : undefined}
            aria-describedby={errorMessage ? `${id}-error` : hint ? `${id}-hint` : undefined}
            {...props}
          />
        )}

        {/* Status icons */}
        {(isValid || errorMessage) && type !== "password" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {isValid ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              errorMessage && <AlertCircle className="h-5 w-5 text-destructive" />
            )}
          </div>
        )}
      </div>

      {/* Feedback messages */}
      {errorMessage && (
        <p 
          id={`${id}-error`} 
          className="text-sm text-destructive flex items-center gap-1"
        >
          {errorMessage}
        </p>
      )}
      
      {!errorMessage && isValid && successMessage && (
        <p className="text-sm text-green-500 flex items-center gap-1">
          {successMessage}
        </p>
      )}
      
      {!errorMessage && !isValid && hint && (
        <p 
          id={`${id}-hint`} 
          className="text-xs text-muted-foreground"
        >
          {hint}
        </p>
      )}
    </div>
  );
}
