
/**
 * OrDivider props
 */
interface OrDividerProps {
  className?: string;
}

/**
 * Simple divider component for auth forms
 * Shows a horizontal line with "or" text in the center
 */
export const OrDivider = ({ className = '' }: OrDividerProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-muted"></div>
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="px-2 bg-background text-muted-foreground">or</span>
      </div>
    </div>
  );
};
