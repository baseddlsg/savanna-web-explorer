
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/**
 * ThemedButton component that extends the base Button with additional features
 * 
 * @component
 * @param {object} props
 * @param {'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'link'} [props.variant='primary'] - Button variant
 * @param {'sm' | 'md' | 'lg' | 'icon'} [props.size='md'] - Button size
 * @param {boolean} [props.loading=false] - If true, shows a loading spinner
 * @param {boolean} [props.fullWidth=false] - If true, button takes full width of container
 * @param {string} [props.loadingText] - Text to display while loading
 * @param {React.ReactNode} props.children - Button content
 */
const ThemedButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button> & {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'link';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    loading?: boolean;
    fullWidth?: boolean;
    loadingText?: string;
  }
>(({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  loadingText,
  disabled,
  children,
  ...props
}, ref) => {
  // Map our variants to shadcn Button variants
  const variantMapping: Record<string, string> = {
    primary: 'default',
    secondary: 'secondary',
    danger: 'destructive',
    outline: 'outline',
    ghost: 'ghost',
    link: 'link'
  };

  // Map our sizes to shadcn Button sizes
  const sizeMapping: Record<string, string> = {
    sm: 'sm',
    md: 'default',
    lg: 'lg',
    icon: 'icon'
  };

  return (
    <Button
      ref={ref}
      variant={variantMapping[variant] as any}
      size={sizeMapping[size] as any}
      disabled={disabled || loading}
      className={cn(
        // Add custom styles based on variants
        variant === 'primary' && "shadow-md hover:shadow-lg hover:shadow-primary/20 transition-shadow",
        variant === 'danger' && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading && loadingText ? loadingText : children}
    </Button>
  );
});

ThemedButton.displayName = "ThemedButton";

export { ThemedButton };
