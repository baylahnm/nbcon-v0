"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { GalleryVerticalEnd } from "lucide-react"
import { OTPForm } from "@/components/otp-form"
import { verifyOTP, resendOTP } from "@/lib/auth"

export default function OTPPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [verificationType, setVerificationType] = useState<"signup" | "email">("signup")

  useEffect(() => {
    // Get email from query params (Pages Router)
    const emailParam = router.query.email as string | undefined
    const typeParam = router.query.type as "signup" | "email" | undefined
    
    if (emailParam) {
      setEmail(emailParam)
    }
    if (typeParam === "email" || typeParam === "signup") {
      setVerificationType(typeParam)
    }
  }, [router.query])

  const handleVerify = async (code: string) => {
    if (!email) {
      throw new Error("Email is required for verification")
    }

    const result = await verifyOTP(email, code, verificationType)

    if (result.success) {
      // Redirect to dashboard on successful verification
      router.push("/dashboard")
    } else {
      throw new Error(result.error || "Verification failed")
    }
  }

  const handleResend = async () => {
    if (!email) {
      throw new Error("Email is required to resend code")
    }

    const result = await resendOTP(email, verificationType)

    if (!result.success) {
      throw new Error(result.error || "Failed to resend code")
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            NBCON PRO
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <OTPForm
              email={email}
              onVerify={handleVerify}
              onResend={handleResend}
            />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
