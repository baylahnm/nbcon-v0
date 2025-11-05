import { UnifiedAuthForm } from "@/components/auth/unified-auth-form"
import { DashboardPreview } from "@/components/auth/dashboard-preview"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <UnifiedAuthForm />
      <div className="relative hidden lg:flex lg:items-center lg:justify-center lg:p-10 bg-gradient-to-br from-background via-background/95 to-background overflow-hidden">
        {/* Animated background gradients - Hero style */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-normal filter blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/15 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" style={{ animationDelay: "700ms" }}></div>
          <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-primary/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse" style={{ animationDelay: "1000ms" }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-primary/5 rounded-full mix-blend-normal filter blur-[120px] animate-pulse" style={{ animationDelay: "500ms" }}></div>
        </div>
        <DashboardPreview />
      </div>
    </div>
  )
}

