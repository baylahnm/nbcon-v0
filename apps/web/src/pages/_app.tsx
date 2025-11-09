import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "@/styles/globals.css";
import "@/styles/theme.css";
import { I18nProvider } from "@/lib/i18n/context";
import PublicLayout from "@/components/layout/PublicLayout";
import { ToastProvider } from "@/components/ui/toast";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Routes that should NOT use PublicLayout (auth, dashboard, etc.)
  const excludedRoutes = [
    "/auth",
    "/dashboard",
    "/billing",
    "/projects",
    "/reports",
    "/settings",
    "/team",
    "/ai",
    "/logout",
    "/api",
    "/docs",
  ];
  
  // Check if current route should use PublicLayout
  const isPublicRoute = !excludedRoutes.some((route) => 
    router.pathname.startsWith(route)
  );

  return (
    <I18nProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange={false}
      >
        <ToastProvider>
          {isPublicRoute ? (
            <PublicLayout>
              <Component {...pageProps} />
            </PublicLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </ToastProvider>
      </NextThemesProvider>
    </I18nProvider>
  );
}

