
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { calculatePasswordStrength, getPasswordStrengthColor, getPasswordStrengthMessage } from '@/utils/passwordUtils';

/**
 * PasswordInput props
 */
interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showStrengthMeter?: boolean;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean; // Add disabled prop
}

/**
 * Password input component with visibility toggle and strength meter
 */
export const PasswordInput = ({
  id,
  value,
  onChange,
  showStrengthMeter = false,
  label,
  placeholder = 'Enter password',
  className = '',
  required = false,
  disabled = false // Add disabled prop with default value
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Calculate password strength if needed
  const strength = showStrengthMeter ? calculatePasswordStrength(value) : null;
  const strengthColor = strength ? getPasswordStrengthColor(strength) : '';
  const strengthMessage = strength ? getPasswordStrengthMessage(strength) : '';
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between">
          <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label} {required && <span className="text-destructive">*</span>}
          </label>
        </div>
      )}
      
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`pr-10 ${className}`}
          required={required}
          disabled={disabled} // Pass disabled prop to Input
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full"
          onClick={togglePasswordVisibility}
          disabled={disabled} // Disable button when input is disabled
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span className="sr-only">
            {showPassword ? 'Hide password' : 'Show password'}
          </span>
        </Button>
      </div>
      
      {showStrengthMeter && value && (
        <div className="space-y-1">
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${strengthColor}`} 
              style={{ 
                width: value ? 
                  strength === 'weak' ? '33%' : 
                  strength === 'medium' ? '66%' : 
                  '100%' : '0%' 
              }} 
            />
          </div>
          <p className="text-xs text-muted-foreground">{strengthMessage}</p>
        </div>
      )}
    </div>
  );
};
