"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Benefit } from "@/types/careers";
import * as LucideIcons from "lucide-react";

interface BenefitCardProps {
  benefit: Benefit;
}

export function BenefitCard({ benefit }: BenefitCardProps) {
  // Dynamically get icon component from lucide-react
  const IconComponent = benefit.icon
    ? (LucideIcons as any)[benefit.icon] || LucideIcons.Gift
    : LucideIcons.Gift;

  return (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardHeader>
        <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
          <IconComponent className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="card-title">{benefit.title}</CardTitle>
        <CardDescription className="body-small">{benefit.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

