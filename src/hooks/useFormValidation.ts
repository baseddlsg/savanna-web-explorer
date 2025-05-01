
import { useState, useEffect } from 'react';
import { supabaseClient } from '@/services/supabaseClient';

/**
 * Form validation hook for auth forms
 */
export function useFormValidation() {
  /**
   * Check if a username already exists in the database
   * @param username The username to check
   * @returns Promise with boolean result
   */
  const checkUsernameExists = async (username: string): Promise<boolean> => {
    if (!username || username.length < 3) return false;
    
    try {
      // This assumes you have a profiles table with usernames
      // Adjust the query based on your actual Supabase schema
      const { data, error } = await supabaseClient
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single();
        
      if (error) {
        console.error('Error checking username:', error);
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
  };
  
  /**
   * Check if an email already exists in Supabase Auth
   * @param email The email to check
   * @returns Promise with boolean result
   */
  const checkEmailExists = async (email: string): Promise<boolean> => {
    if (!email || !email.includes('@')) return false;
    
    try {
      // This is a workaround as Supabase doesn't have a direct "check if email exists" API
      // We attempt to send a password reset and check the error
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email);
      
      // If there's no error or it's not about the user not existing, assume the email exists
      // Note: This will actually send a password reset email if the account exists
      return !error || !error.message.toLowerCase().includes('user not found');
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };
  
  /**
   * Validate email format
   * @param email The email to validate
   * @returns Boolean indicating if email format is valid
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Check if a password meets minimum requirements
   * @param password The password to validate
   * @returns Boolean indicating if password meets requirements
   */
  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };
  
  return {
    checkUsernameExists,
    checkEmailExists,
    validateEmail,
    validatePassword
  };
}

/**
 * Hook to validate a username with debounce
 * @param username The username to validate
 * @param debounceMs Debounce time in ms
 */
export function useUsernameValidation(username: string, debounceMs = 500) {
  const [isChecking, setIsChecking] = useState(false);
  const [exists, setExists] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { checkUsernameExists } = useFormValidation();
  
  useEffect(() => {
    if (!username || username.length < 3) {
      setError(username ? 'Username must be at least 3 characters' : null);
      setExists(false);
      return;
    }
    
    setIsChecking(true);
    setError(null);
    
    const handler = setTimeout(async () => {
      try {
        const usernameExists = await checkUsernameExists(username);
        setExists(usernameExists);
        if (usernameExists) {
          setError('Username already taken');
        }
      } catch (err) {
        console.error('Username validation error:', err);
        setError('Error checking username');
      } finally {
        setIsChecking(false);
      }
    }, debounceMs);
    
    return () => clearTimeout(handler);
  }, [username, debounceMs]);
  
  return { isChecking, exists, error };
}

/**
 * Hook to validate an email with debounce
 * @param email The email to validate
 * @param debounceMs Debounce time in ms
 */
export function useEmailValidation(email: string, debounceMs = 500) {
  const [isChecking, setIsChecking] = useState(false);
  const [exists, setExists] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { checkEmailExists, validateEmail } = useFormValidation();
  
  useEffect(() => {
    if (!email) {
      setError(null);
      setExists(false);
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    
    setIsChecking(true);
    setError(null);
    
    const handler = setTimeout(async () => {
      try {
        const emailExists = await checkEmailExists(email);
        setExists(emailExists);
        if (emailExists) {
          setError('Email already registered');
        }
      } catch (err) {
        console.error('Email validation error:', err);
        setError('Error checking email');
      } finally {
        setIsChecking(false);
      }
    }, debounceMs);
    
    return () => clearTimeout(handler);
  }, [email, debounceMs]);
  
  return { isChecking, exists, error };
}
