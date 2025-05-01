
import { useState } from "react";
import { ThemeToggle } from "../ThemeToggle";
import { SidebarNav } from "./SidebarNav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

/**
 * Sidebar component for main application navigation
 * @param className - Additional CSS classes
 */
export function Sidebar({ className }: { className?: string }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-card p-4 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <div className="text-xl font-bold text-primary">Savannah</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      <SidebarNav
        className={cn("flex-1", collapsed && "items-center")}
      />

      <div className={cn("mt-auto pt-4", collapsed && "flex justify-center")}>
        <ThemeToggle />
      </div>
    </div>
  );
}
