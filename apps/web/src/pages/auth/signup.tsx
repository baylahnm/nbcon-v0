import { ArrowLeft } from "lucide-react"
import { SignupForm } from "@/components/signup-form"
import Link from "next/link"
import { RainingLettersBackground } from "@/components/ui/raining-letters-background"

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <SignupForm />
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block overflow-hidden">
        <RainingLettersBackground />
      </div>
    </div>
  )
}

