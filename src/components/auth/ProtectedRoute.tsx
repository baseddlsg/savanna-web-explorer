
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * ProtectedRoute props
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Protected route component
 * Redirects unauthenticated users to login page
 * Shows loading state while checking auth
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useUser();
  const location = useLocation();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Use effect to handle initial loading state
  useEffect(() => {
    // Set a short timeout to prevent flicker on quick loads
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // While checking auth status, show loading skeleton
  if (loading && isInitialLoading) {
    return (
      <div className="flex flex-col space-y-4 p-8">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-64 w-full" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!user && !loading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render children
  return <>{children}</>;
};
