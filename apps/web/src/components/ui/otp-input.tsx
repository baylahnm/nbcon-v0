"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface OTPInputProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  disabled?: boolean
  className?: string
}

export function OTPInput({
  length = 6,
  value = "",
  onChange,
  onComplete,
  disabled = false,
  className,
}: OTPInputProps) {
  const [otp, setOtp] = React.useState<string[]>(new Array(length).fill(""))
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  React.useEffect(() => {
    // Initialize from value prop if provided
    if (value) {
      const valueArray = value.split("").slice(0, length)
      const newOtp = [...otp]
      valueArray.forEach((char, index) => {
        if (index < length) {
          newOtp[index] = char
        }
      })
      setOtp(newOtp)
    }
  }, []) // Only on mount

  React.useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, newValue: string) => {
    // Only allow single digit
    if (newValue.length > 1) {
      return
    }

    // Only allow numbers
    if (newValue && !/^\d$/.test(newValue)) {
      return
    }

    const newOtp = [...otp]
    newOtp[index] = newValue
    setOtp(newOtp)

    // Combine OTP and call onChange
    const combined = newOtp.join("")
    onChange?.(combined)

    // Auto-focus next input if value entered
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Call onComplete if all fields filled
    if (combined.length === length && newOtp.every((digit) => digit !== "")) {
      onComplete?.(combined)
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (otp[index] && index > 0) {
        // If current field has value, clear it
        const newOtp = [...otp]
        newOtp[index] = ""
        setOtp(newOtp)
        onChange?.(newOtp.join(""))
      } else {
        // Move to previous field
        inputRefs.current[index - 1]?.focus()
        const newOtp = [...otp]
        newOtp[index - 1] = ""
        setOtp(newOtp)
        onChange?.(newOtp.join(""))
      }
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Handle paste
    if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      navigator.clipboard.readText().then((text) => {
        const digits = text.replace(/\D/g, "").slice(0, length).split("")
        const newOtp = [...otp]
        digits.forEach((digit, i) => {
          if (i < length) {
            newOtp[i] = digit
          }
        })
        setOtp(newOtp)
        const combined = newOtp.join("")
        onChange?.(combined)
        if (combined.length === length) {
          onComplete?.(combined)
        }
        // Focus last filled input or next empty
        const lastIndex = Math.min(digits.length - 1, length - 1)
        inputRefs.current[lastIndex]?.focus()
      })
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    const digits = pastedData.replace(/\D/g, "").slice(0, length).split("")
    const newOtp = [...otp]
    digits.forEach((digit, i) => {
      if (i < length) {
        newOtp[i] = digit
      }
    })
    setOtp(newOtp)
    const combined = newOtp.join("")
    onChange?.(combined)
    if (combined.length === length) {
      onComplete?.(combined)
    }
    // Focus last filled input or next empty
    const lastIndex = Math.min(digits.length - 1, length - 1)
    inputRefs.current[lastIndex]?.focus()
  }

  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      {otp.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className="h-12 w-12 text-center text-lg font-semibold"
          autoComplete="one-time-code"
        />
      ))}
    </div>
  )
}

