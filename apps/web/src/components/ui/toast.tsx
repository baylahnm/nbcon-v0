"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error";
  duration?: number;
  onClose?: () => void;
}

interface ToastContextType {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(7);
    const newToast: ToastProps = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    // Auto-remove after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, toast.duration || 3000);
    }
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: ToastProps[];
  removeToast: (id: string) => void;
}) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-[420px]">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function Toast({ title, description, variant = "default", onClose }: ToastProps) {
  return (
    <div
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
        variant === "success" && "border-green-500/50 bg-green-50 dark:bg-green-950/50",
        variant === "error" && "border-red-500/50 bg-red-50 dark:bg-red-950/50",
        variant === "default" && "border-border bg-background"
      )}
    >
      <div className="grid gap-1">
        {title && (
          <div
            className={cn(
              "text-sm font-semibold",
              variant === "success" && "text-green-900 dark:text-green-100",
              variant === "error" && "text-red-900 dark:text-red-100"
            )}
          >
            {title}
          </div>
        )}
        {description && (
          <div
            className={cn(
              "text-sm opacity-90",
              variant === "success" && "text-green-800 dark:text-green-200",
              variant === "error" && "text-red-800 dark:text-red-200"
            )}
          >
            {description}
          </div>
        )}
      </div>
      <button
        onClick={onClose}
        className={cn(
          "absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2",
          variant === "success" && "text-green-900 dark:text-green-100",
          variant === "error" && "text-red-900 dark:text-red-100"
        )}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

