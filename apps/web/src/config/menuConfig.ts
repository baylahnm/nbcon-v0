import {
  LayoutDashboard,
  FolderKanban,
  Bot,
  Users,
  BarChart3,
  CreditCard,
  Settings,
  LifeBuoy,
  LogOut,
  LucideIcon,
} from "lucide-react";

export type SubscriptionTier = "free" | "basic" | "pro" | "enterprise";

export interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
  tier: SubscriptionTier;
  description?: string;
}

// Public routes (no authentication required)
export interface PublicRoute {
  label: string;
  path: string;
}

export const publicRoutes: PublicRoute[] = [
  { label: "Home", path: "/landing" },
  { label: "Login", path: "/auth/login" },
  { label: "Signup", path: "/auth/signup" },
  { label: "OTP Verification", path: "/auth/otp" },
];

export const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    tier: "free",
    description: "Overview and analytics",
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderKanban,
    tier: "basic",
    description: "Manage your projects",
  },
  {
    name: "AI Co-Pilot",
    href: "/ai",
    icon: Bot,
    tier: "pro",
    description: "AI-powered assistance",
  },
  {
    name: "Team",
    href: "/team",
    icon: Users,
    tier: "pro",
    description: "Team collaboration",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
    tier: "pro",
    description: "Analytics and insights",
  },
  {
    name: "Billing",
    href: "/billing",
    icon: CreditCard,
    tier: "free",
    description: "Subscription and payment",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    tier: "free",
    description: "Account preferences",
  },
  {
    name: "Help Center",
    href: "/help",
    icon: LifeBuoy,
    tier: "free",
    description: "Support and documentation",
  },
  {
    name: "Logout",
    href: "/logout",
    icon: LogOut,
    tier: "free",
    description: "Sign out",
  },
];

