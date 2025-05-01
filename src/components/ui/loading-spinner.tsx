
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/**
 * LoadingSpinner component that displays a centered loading animation
 * 
 * @component
 * @param {object} props
 * @param {string} [props.size='md'] - Size of the spinner
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.text] - Optional text to display below spinner
 * @param {boolean} [props.fullPage=false] - If true, centers in the full viewport
 */
export function LoadingSpinner({
  size = "md",
  className,
  text,
  fullPage = false
}: {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
  fullPage?: boolean;
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center",
        fullPage && "fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
        !fullPage && "p-4",
        className
      )}
      aria-label="Loading"
      role="status"
    >
      <Loader2 
        className={cn("animate-spin text-primary", sizeClasses[size])} 
      />
      {text && (
        <p className="mt-2 text-sm text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
