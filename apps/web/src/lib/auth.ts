import { supabase } from "@nbcon/config";
import type { AuthError } from "@supabase/supabase-js";

export interface SignupData {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  data?: {
    user?: unknown;
    session?: unknown;
    needsEmailVerification?: boolean;
  };
}

/**
 * Sign up a new user with email and password
 */
export async function signUp({ email, password, fullName }: SignupData): Promise<AuthResponse> {
  // @nbcon/config client throws if env vars are missing, so we don't need null check

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/otp`,
      },
    });

    if (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error),
      };
    }

    return {
      success: true,
      data: {
        user: data.user,
        session: data.session,
        needsEmailVerification: !data.session, // If no session, email verification is required
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
}

/**
 * Sign in with email and password
 */
export async function signIn({ email, password }: LoginData): Promise<AuthResponse> {
  // @nbcon/config client throws if env vars are missing, so we don't need null check

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error),
      };
    }

    return {
      success: true,
      data: {
        user: data.user,
        session: data.session,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
}

/**
 * Verify OTP code sent to email
 */
export async function verifyOTP(email: string, token: string, type: "signup" | "email" = "signup"): Promise<AuthResponse> {
  // @nbcon/config client throws if env vars are missing, so we don't need null check

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type,
    });

    if (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error),
      };
    }

    return {
      success: true,
      data: {
        user: data.user,
        session: data.session,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
}

/**
 * Resend OTP code to email
 */
export async function resendOTP(email: string, type: "signup" | "email" = "signup"): Promise<AuthResponse> {
  // @nbcon/config client throws if env vars are missing, so we don't need null check

  try {
    // Map our internal type to Supabase's expected type
    const supabaseType: "signup" | "email_change" = type === "email" ? "email_change" : "signup";
    
    const { error } = await supabase.auth.resend({
      type: supabaseType,
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/otp`,
      },
    });

    if (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error),
      };
    }

    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<AuthResponse> {
  // @nbcon/config client throws if env vars are missing, so we don't need null check

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error),
      };
    }

    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
}

/**
 * Get current session
 */
export async function getSession() {
  // @nbcon/config client throws if env vars are missing, so we don't need null check
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
}

/**
 * Get current user
 */
export async function getUser() {
  // @nbcon/config client throws if env vars are missing, so we don't need null check
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
}

/**
 * Translate Supabase auth errors to user-friendly messages
 */
function getAuthErrorMessage(error: AuthError): string {
  const errorMessages: Record<string, string> = {
    "Invalid login credentials": "Invalid email or password. Please try again.",
    "Email not confirmed": "Please verify your email address before signing in.",
    "User already registered": "An account with this email already exists.",
    "Password should be at least 6 characters": "Password must be at least 6 characters.",
    "Unable to validate email address: invalid format": "Please enter a valid email address.",
    "Token has expired or is invalid": "Verification code has expired. Please request a new one.",
    "For security purposes, you can only request this once every 60 seconds": "Please wait before requesting a new code.",
  };

  // Check for exact match first
  if (errorMessages[error.message]) {
    return errorMessages[error.message];
  }

  // Check for partial matches
  if (error.message.includes("email")) {
    return "Please check your email address and try again.";
  }
  if (error.message.includes("password")) {
    return "Please check your password and try again.";
  }
  if (error.message.includes("token") || error.message.includes("OTP")) {
    return "Invalid or expired verification code. Please request a new one.";
  }

  // Default fallback
  return error.message || "An error occurred. Please try again.";
}

