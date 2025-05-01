
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  LogIn,
  UserPlus,
  Layout,
  Image,
  Globe,
  User,
} from "lucide-react";

/**
 * Navigation item configuration
 */
interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

/**
 * Main navigation items for sidebar
 */
const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Login",
    href: "/login",
    icon: <LogIn className="h-5 w-5" />,
  },
  {
    title: "Sign Up",
    href: "/signup",
    icon: <UserPlus className="h-5 w-5" />,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Layout className="h-5 w-5" />,
  },
  {
    title: "Gallery",
    href: "/gallery",
    icon: <Image className="h-5 w-5" />,
  },
  {
    title: "Space",
    href: "/space",
    icon: <Globe className="h-5 w-5" />,
  },
  {
    title: "Account",
    href: "/account",
    icon: <User className="h-5 w-5" />,
  },
];

/**
 * Sidebar navigation component
 * @param className - Additional CSS classes
 */
export function SidebarNav({ className }: { className?: string }) {
  const location = useLocation();

  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
            location.pathname === item.href
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          )}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}
