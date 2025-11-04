import { supabase } from "./supabase-client";
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
  data?: any;
}

/**
 * Sign up a new user with email and password
 */
export async function signUp({ email, password, fullName }: SignupData): Promise<AuthResponse> {
  if (!supabase) {
    return {
      success: false,
      error: "Supabase client is not configured. Please check your environment variables.",
    };
  }

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
  if (!supabase) {
    return {
      success: false,
      error: "Supabase client is not configured. Please check your environment variables.",
    };
  }

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
  if (!supabase) {
    return {
      success: false,
      error: "Supabase client is not configured. Please check your environment variables.",
    };
  }

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
  if (!supabase) {
    return {
      success: false,
      error: "Supabase client is not configured. Please check your environment variables.",
    };
  }

  try {
    const { error } = await supabase.auth.resend({
      type,
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
  if (!supabase) {
    return {
      success: false,
      error: "Supabase client is not configured. Please check your environment variables.",
    };
  }

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
  if (!supabase) {
    return { data: null, error: new Error("Supabase client is not configured") };
  }
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
}

/**
 * Get current user
 */
export async function getUser() {
  if (!supabase) {
    return { data: null, error: new Error("Supabase client is not configured") };
  }
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

