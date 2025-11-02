import { GalleryVerticalEnd } from "lucide-react"
import { OTPForm } from "@/components/otp-form"

export default function OTPPage() {
  // TODO: Get email from query params or session
  const email = "user@example.com" // Replace with actual email from auth flow

  const handleVerify = async (code: string) => {
    // TODO: Wire to Supabase auth verification
    console.log("Verifying code:", code)
    // Example:
    // const { data, error } = await supabase.auth.verifyOtp({
    //   email,
    //   token: code,
    //   type: 'email'
    // })
  }

  const handleResend = async () => {
    // TODO: Wire to Supabase auth resend OTP
    console.log("Resending OTP to:", email)
    // Example:
    // const { error } = await supabase.auth.resend({
    //   type: 'signup',
    //   email
    // })
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
