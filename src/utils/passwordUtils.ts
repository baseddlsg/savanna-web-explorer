
import { PasswordStrength } from "@/types";

/**
 * Calculate password strength based on various criteria
 * @param password The password string to evaluate
 * @returns Password strength rating
 */
export function calculatePasswordStrength(password: string): PasswordStrength {
  if (!password) return 'weak';
  
  // Check password criteria
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  // Count the number of criteria met
  const criteriaCount = [
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar
  ].filter(Boolean).length;
  
  if (criteriaCount >= 4) return 'strong';
  if (criteriaCount >= 2) return 'medium';
  return 'weak';
}

/**
 * Get a user-friendly message about password strength
 * @param strength Password strength level
 * @returns Human-readable message about password requirements
 */
export function getPasswordStrengthMessage(strength: PasswordStrength): string {
  switch (strength) {
    case 'weak':
      return 'Password is too weak. Use at least 8 characters with uppercase, lowercase, numbers, and special characters.';
    case 'medium':
      return 'Password is okay. For better security, add more character types.';
    case 'strong':
      return 'Strong password!';
    default:
      return 'Use a mix of letters, numbers, and symbols.';
  }
}

/**
 * Get color for password strength indicator
 * @param strength Password strength level
 * @returns CSS color class
 */
export function getPasswordStrengthColor(strength: PasswordStrength): string {
  switch (strength) {
    case 'weak':
      return 'bg-destructive';
    case 'medium':
      return 'bg-yellow-500';
    case 'strong':
      return 'bg-green-500';
    default:
      return 'bg-gray-300';
  }
}
