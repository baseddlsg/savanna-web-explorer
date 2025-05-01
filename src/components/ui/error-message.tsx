
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, RefreshCw } from "lucide-react";

/**
 * ErrorMessage component for displaying error states with retry functionality
 * 
 * @component
 * @param {object} props
 * @param {string} [props.title="Something went wrong"] - Error title/heading
 * @param {string} [props.description] - Detailed error description
 * @param {() => void} [props.onRetry] - Function to call when retry button is clicked
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.fullPage=false] - If true, centers in the full viewport
 */
export function ErrorMessage({
  title = "Something went wrong",
  description,
  onRetry,
  className,
  fullPage = false
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
  fullPage?: boolean;
}) {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center text-center p-6 rounded-lg border border-destructive/30 bg-destructive/5",
        fullPage && "fixed inset-0 z-50",
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <AlertCircle className="h-10 w-10 text-destructive mb-4" />
      
      <h3 className="text-lg font-semibold text-destructive mb-1">
        {title}
      </h3>
      
      {description && (
        <p className="text-sm text-muted-foreground mb-4 max-w-md">
          {description}
        </p>
      )}
      
      {onRetry && (
        <Button 
          variant="outline" 
          onClick={onRetry}
          className="mt-2"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </Button>
      )}
    </div>
  );
}
