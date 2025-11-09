"use client";

import * as React from "react";
import { Skeleton } from "./skeleton";

export function ConversationSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 p-8">
      {/* Plan Badge Skeleton */}
      <div className="flex justify-center">
        <Skeleton className="h-8 w-32" />
      </div>

      {/* Message Bubbles Skeleton */}
      <div className="w-full space-y-4 p-4 border rounded-lg bg-background">
        {/* User message skeleton */}
        <div className="flex flex-col gap-2 items-end">
          <div className="flex items-start gap-2 flex-row-reverse">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="max-w-[80%] space-y-2">
              <Skeleton className="h-6 w-24 rounded-lg" />
              <Skeleton className="h-20 w-64 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Assistant message skeleton */}
        <div className="flex flex-col gap-2 items-start">
          <div className="flex items-start gap-2 flex-row">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="max-w-[80%] space-y-2">
              <Skeleton className="h-6 w-32 rounded-lg" />
              <Skeleton className="h-32 w-96 rounded-lg" />
              <Skeleton className="h-24 w-80 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Input Area Skeleton */}
      <div className="w-full space-y-2">
        <Skeleton className="h-24 w-full rounded-lg" />
        <div className="flex items-center justify-between px-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

