"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import { ArrowLeft, ArrowRight, Mail, Lock, Eye, EyeOff, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { signIn, signUp } from "@/lib/auth"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export function UnifiedAuthForm() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")
  const [language, setLanguage] = useState("en")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({})
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setLoginErrors({})

    if (!loginData.email || !loginData.password) {
      setLoginErrors({
        email: !loginData.email ? "Email is required" : "",
        password: !loginData.password ? "Password is required" : "",
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await signIn({
        email: loginData.email,
        password: loginData.password,
      })

      if (result.success) {
        router.push("/dashboard")
      } else {
        setSubmitError(result.error || "Failed to sign in")
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setSignupErrors({})

    const errors: Record<string, string> = {}
    if (!signupData.fullName) errors.fullName = "Full name is required"
    if (!signupData.email) errors.email = "Email is required"
    if (!signupData.password) errors.password = "Password is required"
    if (signupData.password !== signupData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    if (Object.keys(errors).length > 0) {
      setSignupErrors(errors)
      return
    }

    setIsLoading(true)
    try {
      const result = await signUp({
        email: signupData.email,
        password: signupData.password,
        fullName: signupData.fullName,
      })

      if (result.success) {
        if (result.data?.needsEmailVerification) {
          router.push(`/auth/otp?email=${encodeURIComponent(signupData.email)}`)
        } else {
          router.push("/dashboard")
        }
      } else {
        setSubmitError(result.error || "Failed to create account")
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full flex items-center justify-center p-8 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="flex justify-start mb-4">
          <Button variant="ghost" asChild className="gap-2 text-muted-foreground hover:text-foreground">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        {/* Language Switcher */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage("en")}
              className={language === "en" ? "bg-primary text-primary-foreground shadow-sm hover:opacity-90" : "hover:bg-accent"}
            >
              English
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage("ar")}
              className={language === "ar" ? "bg-primary text-primary-foreground shadow-sm hover:opacity-90" : "hover:bg-accent"}
            >
              العربية
            </Button>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="border-border/20 shadow-xl bg-card dark:bg-surface">
          <CardHeader className="text-center pb-4 border-b border-border/40">
            {/* Logo */}
            <div className="flex items-center justify-center bg-primary rounded-lg w-9 h-9 mx-auto mb-4">
              <span className="text-primary-foreground font-bold relative inline-block text-2xl">
                n.
                <span className="absolute italic font-bold transform -rotate-12 -top-2 left-2 text-[8px]" style={{ fontFamily: "Quintessential, cursive" }}>
                  pro
                </span>
              </span>
            </div>
            <CardTitle className="text-2xl tracking-tight">Welcome to nbcon</CardTitle>
            <CardDescription>Saudi Arabia&apos;s Professional Engineering Marketplace</CardDescription>
          </CardHeader>

          <CardContent className="p-4 space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b border-border mb-6">
                <TabsList className="text-muted-foreground/70 inline-flex items-center justify-center w-full h-auto bg-transparent p-0 border-0 rounded-none">
                  <TabsTrigger value="login" className="flex-1 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:shadow-black/5">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="flex-1 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:shadow-black/5">Sign Up</TabsTrigger>
                </TabsList>
              </div>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4 mt-2">
                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Button variant="outline" className="h-11" type="button">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span>Google</span>
                  </Button>
                  <Button variant="outline" className="h-11" type="button">
                    <svg className="w-5 h-5 mr-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </Button>
                  <Button variant="outline" className="h-11" type="button">
                    <svg className="w-5 h-5 mr-2 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>LinkedIn</span>
                  </Button>
                  <Button variant="outline" className="h-11" type="button">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    <span>GitHub</span>
                  </Button>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card dark:bg-surface px-2 text-muted-foreground">or</span>
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 border-primary/20 focus-visible:border-primary focus-visible:ring-primary/20"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                    {loginErrors.email && <p className="text-xs text-destructive">{loginErrors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 border-primary/20 focus-visible:border-primary focus-visible:ring-primary/20"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-auto p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {loginErrors.password && <p className="text-xs text-destructive">{loginErrors.password}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked === true)}
                      />
                      <Label htmlFor="remember" className="text-sm cursor-pointer">
                        Remember me
                      </Label>
                    </div>
                    <Button type="button" variant="link" className="text-primary text-sm p-0 h-auto">
                      Forgot password?
                    </Button>
                  </div>

                  {submitError && (
                    <div className="text-sm text-destructive text-center bg-destructive/10 p-3 rounded-md">
                      {submitError}
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90 h-10 shadow-sm shadow-black/5" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        Sign In
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="space-y-4 mt-2">
                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Button variant="outline" className="h-11 border border-input bg-background dark:bg-surface-elevated shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground" type="button">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span>Google</span>
                  </Button>
                  <Button variant="outline" className="h-11 border border-input bg-background dark:bg-surface-elevated shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground" type="button">
                    <svg className="w-5 h-5 mr-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </Button>
                  <Button variant="outline" className="h-11 border border-input bg-background dark:bg-surface-elevated shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground" type="button">
                    <svg className="w-5 h-5 mr-2 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>LinkedIn</span>
                  </Button>
                  <Button variant="outline" className="h-11 border border-input bg-background dark:bg-surface-elevated shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground" type="button">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    <span>GitHub</span>
                  </Button>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card dark:bg-surface px-2 text-muted-foreground">or</span>
                  </div>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-fullName">Full Name</Label>
                    <Input
                      id="signup-fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className="border-primary/20 focus-visible:border-primary focus-visible:ring-primary/20"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                    {signupErrors.fullName && <p className="text-xs text-destructive">{signupErrors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 border-primary/20 focus-visible:border-primary focus-visible:ring-primary/20"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                      />
                    </div>
                    {signupErrors.email && <p className="text-xs text-destructive">{signupErrors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10 border-primary/20 focus-visible:border-primary focus-visible:ring-primary/20"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-auto p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {signupErrors.password && <p className="text-xs text-destructive">{signupErrors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="signup-confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10 border-primary/20 focus-visible:border-primary focus-visible:ring-primary/20"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                    {signupErrors.confirmPassword && <p className="text-xs text-destructive">{signupErrors.confirmPassword}</p>}
                  </div>

                  {submitError && (
                    <div className="text-sm text-destructive text-center bg-destructive/10 p-3 rounded-md">
                      {submitError}
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90 h-10 shadow-sm shadow-black/5" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        Sign Up
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Security Footer */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Protected by enterprise-grade security</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

