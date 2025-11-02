"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { OTPInput } from "@/components/ui/otp-input"

export interface OTPFormProps {
  className?: string
  email?: string
  onVerify?: (code: string) => void | Promise<void>
  onResend?: () => void | Promise<void>
}

export function OTPForm({
  className,
  email,
  onVerify,
  onResend,
}: OTPFormProps) {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleVerify = async (code: string) => {
    if (code.length !== 6) {
      setError("Please enter a valid 6-digit code")
      return
    }

    setIsVerifying(true)
    setError(null)

    try {
      await onVerify?.(code)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed")
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    if (resendTimer > 0) return

    try {
      await onResend?.()
      setResendTimer(60) // 60 second cooldown
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend code")
    }
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={(e) => {
        e.preventDefault()
        if (otp.length === 6) {
          handleVerify(otp)
        }
      }}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Verify your email</h1>
        <p className="text-balance text-sm text-muted-foreground">
          We sent a verification code to
          {email ? (
            <span className="font-medium text-foreground"> {email}</span>
          ) : (
            " your email"
          )}
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="otp" className="sr-only">
            Verification Code
          </Label>
          <OTPInput
            value={otp}
            onChange={(value) => {
              setOtp(value)
              setError(null)
            }}
            onComplete={(code) => {
              handleVerify(code)
            }}
            disabled={isVerifying}
          />
          {error && <p className="text-xs text-destructive text-center">{error}</p>}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={otp.length !== 6 || isVerifying}
        >
          {isVerifying ? "Verifying..." : "Verify Email"}
        </Button>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Didn't receive the code? </span>
          {resendTimer > 0 ? (
            <span className="text-muted-foreground">
              Resend in {resendTimer}s
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="underline underline-offset-4 hover:text-foreground"
            >
              Resend code
            </button>
          )}
        </div>
      </div>

      <div className="text-center text-sm">
        Wrong email?{" "}
        <a href="/auth/signup" className="underline underline-offset-4">
          Go back
        </a>
      </div>
    </form>
  )
}

