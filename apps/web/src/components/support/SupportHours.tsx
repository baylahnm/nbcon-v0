"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface ResponseTime {
  tier: string;
  time: string;
}

const responseTimes: ResponseTime[] = [
  { tier: "Free/Basic", time: "48-72 hours" },
  { tier: "Pro", time: "24-48 hours" },
  { tier: "Teams", time: "12-24 hours" },
  { tier: "Enterprise", time: "1-4 hours (SLA)" },
];

export function SupportHours() {
  return (
    <Card className="border-[0.5px] border-border/50 bg-surface">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <CardTitle>Support Hours & Availability</CardTitle>
        </div>
        <CardDescription>Our support team is available during these hours</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Standard Support Hours</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              <span className="font-medium">Days:</span> Monday - Friday
            </p>
            <p>
              <span className="font-medium">Hours:</span> 9:00 AM - 6:00 PM GMT
            </p>
            <p>
              <span className="font-medium">Timezone:</span> Greenwich Mean Time (GMT)
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Response Times by Plan</h3>
          <div className="space-y-2">
            {responseTimes.map((rt) => (
              <div key={rt.tier} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium">{rt.tier}</span>
                <Badge variant="secondary">{rt.time}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Holiday Schedule</h3>
          <p className="text-sm text-muted-foreground">
            Support may be limited during major holidays. We'll notify you in advance of any schedule changes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

