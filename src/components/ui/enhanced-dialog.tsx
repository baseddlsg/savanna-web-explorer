
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * EnhancedDialog component that extends the base Dialog with improved accessibility
 * 
 * @component
 * @param {object} props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {(open: boolean) => void} props.onOpenChange - Handler for open state changes
 * @param {string} [props.title] - Dialog title
 * @param {string} [props.description] - Dialog description
 * @param {React.ReactNode} props.children - Dialog content
 * @param {React.ReactNode} [props.footer] - Dialog footer content
 * @param {string} [props.contentClassName] - Additional CSS classes for the content
 * @param {boolean} [props.showClose=true] - Whether to show the close button
 * @param {'sm' | 'md' | 'lg' | 'xl' | 'full'} [props.size='md'] - Dialog size
 * @param {boolean} [props.blurBackdrop=true] - Whether to blur the backdrop
 */
export function EnhancedDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  contentClassName,
  showClose = true,
  size = "md",
  blurBackdrop = true
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  contentClassName?: string;
  showClose?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  blurBackdrop?: boolean;
}) {
  // Set up keyboard handling for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };

    // Add global event listener when dialog is open
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  // Prevent body scrolling when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Size classes for the dialog content
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-[calc(100vw-2rem)] w-full h-[calc(100vh-2rem)]"
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={cn(
          sizeClasses[size],
          blurBackdrop && "backdrop-blur-sm data-[state=open]:bg-background/95", 
          "shadow-lg focus:outline-none",
          contentClassName
        )}
        onEscapeKeyDown={() => onOpenChange(false)}
        onInteractOutside={(e) => {
          // Prevent closing when clicking on floating ui elements
          if ((e.target as HTMLElement).getAttribute('data-floating') === 'true') {
            e.preventDefault();
          }
        }}
      >
        {showClose && (
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        )}

        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        <div className={cn(size === 'full' && "flex-1 overflow-auto")}>
          {children}
        </div>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
