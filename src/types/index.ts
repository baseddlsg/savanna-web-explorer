
/**
 * User type definition
 */
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  username?: string;
}

/**
 * Password strength levels
 */
export type PasswordStrength = 'weak' | 'medium' | 'strong';

/**
 * Auth provider types
 */
export type OAuthProvider = 'google' | 'discord';
