
import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "../ThemeToggle";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { UserAvatar } from "../UserAvatar";

/**
 * AppShell component that wraps the application with a responsive layout
 * Includes a collapsible sidebar, header with user info, and theme toggle
 * 
 * @component
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Content to be rendered inside the main area
 * @param {string} [props.className] - Optional additional classes for the main content area
 */
export function AppShell({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  const isMobile = useIsMobile();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const { user, loading } = useUser();

  // Close mobile sidebar when user navigates or resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (!isMobile && showMobileSidebar) {
        setShowMobileSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, showMobileSidebar]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 border-b flex items-center justify-between px-4 bg-background sticky top-0 z-10">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileSidebar(!showMobileSidebar)}
              aria-label={showMobileSidebar ? "Close menu" : "Open menu"}
            >
              {showMobileSidebar ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
          <div className="text-xl font-bold text-primary">Savannah</div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {user && !loading && (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <p className="text-sm font-medium">
                  Hello, {user.firstName || user.username || user.email?.split('@')[0]}
                </p>
              </div>
              <UserAvatar
                src={user.avatarUrl}
                alt={user.firstName || user.username || "User"}
                status="online"
              />
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        {!isMobile && <Sidebar className="h-[calc(100vh-4rem)] sticky top-16" />}

        {/* Mobile sidebar */}
        {isMobile && showMobileSidebar && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="absolute left-0 top-16 h-[calc(100vh-4rem)]">
              <Sidebar className="h-full" />
            </div>
            <div 
              className="absolute inset-0" 
              onClick={() => setShowMobileSidebar(false)}
              aria-hidden="true"
            />
          </div>
        )}

        {/* Main content */}
        <main className={cn("flex-1 overflow-auto p-4 md:p-6 lg:p-8", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}
