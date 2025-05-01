
import { createClient } from '@supabase/supabase-js';
import { User } from '@/types';

/**
 * Default Supabase URL and anon key for development
 * These are fallbacks to prevent errors when environment variables are missing
 */
const FALLBACK_SUPABASE_URL = 'https://your-supabase-project-url.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Replace with actual public anon key

/**
 * Create and export the Supabase client for use across the application
 * Uses environment variables for configuration with fallbacks to prevent errors
 */
export const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY
);

/**
 * Authentication services for Supabase
 * Provides methods for user authentication and session management
 */
export const authService = {
  /**
   * Sign in a user with email and password
   * @param email User's email
   * @param password User's password
   */
  signInWithEmail: async (email: string, password: string) => {
    return await supabaseClient.auth.signInWithPassword({ email, password });
  },

  /**
   * Sign in a user with OAuth provider
   * @param provider OAuth provider (google, discord, etc.)
   */
  signInWithOAuth: async (provider: 'google' | 'discord') => {
    return await supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  },

  /**
   * Sign up a user with email, password, and optional user data
   * @param email User's email
   * @param password User's password
   * @param userData Additional user data
   */
  signUpWithEmail: async (email: string, password: string, userData?: { username: string }) => {
    return await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  },

  /**
   * Sign out the current user
   */
  signOut: async () => {
    return await supabaseClient.auth.signOut();
  },

  /**
   * Send a password reset email to the user
   * @param email User's email
   */
  resetPassword: async (email: string) => {
    return await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
  },

  /**
   * Get the current session
   */
  getSession: async () => {
    return await supabaseClient.auth.getSession();
  },

  /**
   * Get the current user
   */
  getUser: async () => {
    const { data } = await supabaseClient.auth.getUser();
    return data?.user;
  },
};

/**
 * Map Supabase user to our application User type
 * @param supabaseUser User from Supabase
 * @returns Application User
 */
export const mapSupabaseUser = (supabaseUser: any): User | null => {
  if (!supabaseUser) return null;
  return {
    id: supabaseUser.id,
    email: supabaseUser.email,
    firstName: supabaseUser.user_metadata?.firstName || '',
    lastName: supabaseUser.user_metadata?.lastName || '',
    avatarUrl: supabaseUser.user_metadata?.avatar_url || '',
    username: supabaseUser.user_metadata?.username || '',
  };
};
