"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ExternalLink } from "lucide-react";
import type { CommunityEvent } from "@/types/community";
import { format } from "date-fns";

interface EventCardProps {
  event: CommunityEvent;
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = format(new Date(event.date), "MMM d, yyyy");
  const eventTime = format(new Date(event.date), "h:mm a");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "default";
      case "ongoing":
        return "secondary";
      case "completed":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      {event.image && (
        <div className="relative h-48 bg-muted">
          <Image
            src={event.image}
            alt={event.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={getStatusColor(event.status) as any}>
                {event.status}
              </Badge>
              <Badge variant="outline">{event.type}</Badge>
            </div>
            <CardTitle className="card-title">{event.name}</CardTitle>
            <p className="body-small text-muted-foreground mt-2 line-clamp-2">
              {event.description}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="body-small">
              {eventDate} at {eventTime}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="body-small">
              {event.locationType === "virtual" ? "Virtual" : event.location}
            </span>
          </div>
          {event.maxAttendees && (
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="body-small">
                {event.currentAttendees} / {event.maxAttendees} attendees
              </span>
            </div>
          )}
        </div>
        {event.registrationUrl ? (
          <Button variant="outline" className="w-full" asChild>
            <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
              Register
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            Registration Coming Soon
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

