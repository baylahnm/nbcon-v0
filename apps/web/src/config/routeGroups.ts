import { MenuItem, SubscriptionTier } from "./menuConfig";

export interface RouteGroup {
  name: string;
  routes: string[];
  minTier: SubscriptionTier;
}

export const routeGroups: RouteGroup[] = [
  {
    name: "Core",
    routes: ["/dashboard", "/projects", "/team"],
    minTier: "free",
  },
  {
    name: "AI Tools",
    routes: ["/ai", "/reports"],
    minTier: "pro",
  },
  {
    name: "Admin / Finance",
    routes: ["/billing", "/settings"],
    minTier: "free",
  },
  {
    name: "Support",
    routes: ["/help", "/logout"],
    minTier: "free",
  },
];

export function getRouteGroup(href: string): RouteGroup | undefined {
  return routeGroups.find((group) => group.routes.includes(href));
}

