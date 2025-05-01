
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "@/services/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Auth callback page component
 * Handles OAuth redirects and session establishment
 */
export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      try {
        // Get the auth code from the URL
        const hash = window.location.hash;
        const query = window.location.search;

        // If we have a hash or query param from OAuth provider
        if (hash || query) {
          // Wait for Supabase to handle the callback
          // Supabase Auth will automatically exchange the code for a session
          const { data, error } = await supabaseClient.auth.getSession();
          
          if (error) {
            throw error;
          }
          
          // If we have a session, the user is logged in
          if (data?.session) {
            navigate("/dashboard", { replace: true });
          } else {
            navigate("/login", { 
              state: { message: "Authentication completed. Please sign in." },
              replace: true
            });
          }
        } else {
          // If there's no hash, redirect to login
          navigate("/login", { replace: true });
        }
      } catch (error: any) {
        console.error("Error in auth callback:", error);
        setError(error.message || "Authentication failed");
        // Redirect to login after a delay
        setTimeout(() => {
          navigate("/login", { 
            state: { message: "Authentication failed. Please try again." },
            replace: true
          });
        }, 2000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      {error ? (
        <div className="text-center space-y-4">
          <div className="rounded-full bg-destructive/10 p-6 mx-auto w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-destructive"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>
          <h3 className="text-xl font-medium">Authentication Error</h3>
          <p className="text-muted-foreground">{error}</p>
          <p className="text-muted-foreground text-sm">Redirecting to login...</p>
        </div>
      ) : (
        <div className="space-y-6 w-full max-w-md">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              Processing Authentication
            </h2>
            <p className="text-muted-foreground">
              Please wait while we complete your authentication...
            </p>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-lg bg-primary/10" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
