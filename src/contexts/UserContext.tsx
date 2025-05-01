
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { authService, mapSupabaseUser, supabaseClient } from '@/services/supabaseClient';
import { useToast } from '@/hooks/use-toast';

/**
 * User context state interface
 */
interface UserContextState {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithOAuth: (provider: 'google' | 'discord') => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshSession: () => Promise<void>;
}

/**
 * Create context with default values
 */
const UserContext = createContext<UserContextState>({
  user: null,
  loading: true,
  error: null,
  signIn: async () => {},
  signInWithOAuth: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  refreshSession: async () => {},
});

/**
 * User provider props
 */
interface UserProviderProps {
  children: React.ReactNode;
}

/**
 * User context provider component
 * Manages authentication state and provides auth methods
 */
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await authService.signInWithEmail(email, password);
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        setUser(mapSupabaseUser(data.user));
      }
    } catch (err: any) {
      setError(err);
      toast({
        title: 'Sign in failed',
        description: err.message || 'Please check your credentials and try again.',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign in with OAuth provider
   */
  const signInWithOAuth = async (provider: 'google' | 'discord') => {
    try {
      setLoading(true);
      setError(null);
      await authService.signInWithOAuth(provider);
      // Auth redirect happens here, so we don't need to update state
    } catch (err: any) {
      setError(err);
      setLoading(false);
      toast({
        title: `${provider.charAt(0).toUpperCase() + provider.slice(1)} sign in failed`,
        description: err.message || 'Please try again later.',
        variant: 'destructive',
      });
      throw err;
    }
  };

  /**
   * Sign up with email, password and username
   */
  const signUp = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await authService.signUpWithEmail(email, password, { username });
      
      if (error) {
        throw error;
      }

      toast({
        title: 'Sign up successful',
        description: 'Please check your email to verify your account.',
      });
    } catch (err: any) {
      setError(err);
      toast({
        title: 'Sign up failed',
        description: err.message || 'Please try again later.',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign out the current user
   */
  const signOut = async () => {
    try {
      setLoading(true);
      await authService.signOut();
      setUser(null);
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
    } catch (err: any) {
      setError(err);
      toast({
        title: 'Sign out failed',
        description: err.message || 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset password for a user
   */
  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await authService.resetPassword(email);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Password reset email sent',
        description: 'Check your inbox for instructions to reset your password.',
      });
    } catch (err: any) {
      setError(err);
      toast({
        title: 'Password reset failed',
        description: err.message || 'Please try again later.',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refresh the current session
   */
  const refreshSession = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await authService.getSession();
      if (data.session?.user) {
        setUser(mapSupabaseUser(data.session.user));
      } else {
        setUser(null);
      }
    } catch (err: any) {
      setError(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Listen for auth state changes
   */
  useEffect(() => {
    // Initial session check
    refreshSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(mapSupabaseUser(session.user));
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Clean up subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Context value
  const value = {
    user,
    loading,
    error,
    signIn,
    signInWithOAuth,
    signUp,
    signOut,
    resetPassword,
    refreshSession,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/**
 * Custom hook to use user context
 * @returns UserContext state and methods
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
