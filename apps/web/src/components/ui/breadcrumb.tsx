import { useLocation, Link } from "react-router-dom";
import { menuItems, publicRoutes } from "../../config/menuConfig";
import { ChevronRight, Home } from "lucide-react";
import { clsx } from "clsx";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumb() {
  const location = useLocation();
  const pathname = location.pathname;

  // Build breadcrumb items
  const items: BreadcrumbItem[] = [];

  // Always start with Home
  items.push({ label: "Home", href: "/" });

  // Skip if already at home
  if (pathname === "/" || pathname === "/landing") {
    return null;
  }

  // Find matching menu item
  const menuItem = menuItems.find((item) => item.href === pathname);
  const publicRoute = publicRoutes.find((route) => route.path === pathname);

  if (menuItem) {
    items.push({ label: menuItem.name, href: menuItem.href });
  } else if (publicRoute) {
    items.push({ label: publicRoute.label, href: publicRoute.path });
  } else {
    // Handle nested routes (e.g., /billing/success)
    const pathSegments = pathname.split("/").filter(Boolean);
    pathSegments.forEach((segment, index) => {
      const segmentPath = "/" + pathSegments.slice(0, index + 1).join("/");
      const segmentMenuItem = menuItems.find((item) => item.href === segmentPath);
      
      if (segmentMenuItem) {
        items.push({ label: segmentMenuItem.name, href: segmentMenuItem.href });
      } else {
        // Format segment name (e.g., "success" -> "Success")
        const formattedLabel = segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        items.push({ label: formattedLabel, href: segmentPath });
      }
    });
  }

  // Don't show breadcrumb if only one item (just Home)
  if (items.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index === 0 ? (
                <Link
                  to={item.href}
                  className={clsx(
                    "flex items-center gap-1 hover:text-foreground transition-colors",
                    isLast && "text-foreground font-medium"
                  )}
                >
                  <Home className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4" />
                  {isLast ? (
                    <span className="text-foreground font-medium">{item.label}</span>
                  ) : (
                    <Link
                      to={item.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
