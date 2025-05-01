
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/**
 * UserAvatar component for displaying user avatars with various sizes and optional status indicator
 * 
 * @component
 * @param {object} props - Component props
 * @param {string} [props.src] - URL to the user's avatar image
 * @param {string} props.alt - Alternative text for the avatar
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} [props.size='md'] - Size of the avatar
 * @param {'online' | 'offline' | 'busy' | 'away' | null} [props.status] - User's status (displays a colored dot)
 */
export function UserAvatar({
  src,
  alt,
  className,
  size = "md",
  status
}: {
  src?: string;
  alt: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away' | null;
}) {
  // Generate initials from alt text
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  // Determine sizes based on the size prop
  const avatarSizeClasses = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg"
  };

  // Status indicator colors
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-red-500",
    away: "bg-amber-400"
  };

  // Status dot sizes
  const statusSizes = {
    xs: "h-1.5 w-1.5",
    sm: "h-2 w-2",
    md: "h-2.5 w-2.5",
    lg: "h-3 w-3",
    xl: "h-3.5 w-3.5"
  };

  return (
    <div className="relative inline-block">
      <Avatar className={cn(avatarSizeClasses[size], className)}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {getInitials(alt)}
        </AvatarFallback>
      </Avatar>
      
      {status && (
        <span 
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-background",
            statusColors[status],
            statusSizes[size]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}
