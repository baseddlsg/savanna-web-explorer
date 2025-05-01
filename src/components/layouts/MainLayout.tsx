
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

/**
 * Layout properties
 */
interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Main application layout with responsive sidebar
 * @param props - Component properties
 */
export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      {!isMobile && <Sidebar className="h-screen sticky top-0" />}

      {/* Sidebar for mobile */}
      {isMobile && showMobileSidebar && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="absolute left-0 top-0 h-full">
            <Sidebar className="h-screen" />
          </div>
          <div 
            className="absolute inset-0" 
            onClick={() => setShowMobileSidebar(false)}
          />
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1">
        {isMobile && (
          <div className="h-16 border-b flex items-center px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileSidebar(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
            <div className="ml-4 text-xl font-bold text-primary">Savannah</div>
          </div>
        )}
        <main className={cn("p-4 md:p-8")}>
          {children}
        </main>
      </div>
    </div>
  );
}
