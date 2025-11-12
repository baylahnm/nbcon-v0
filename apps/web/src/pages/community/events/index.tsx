"use client";

import { useState } from "react";
import Head from "next/head";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCommunity } from "@/hooks/useCommunity";
import { EventCard } from "@/components/community/EventCard";

export default function EventsPage() {
  const [eventType, setEventType] = useState<string | undefined>();
  const [status, setStatus] = useState<"upcoming" | "ongoing" | "completed" | "cancelled">("upcoming");

  const { events, loading, error } = useCommunity({
    filters: {
      type: eventType,
    },
  });

  // Filter events by status
  const filteredEvents = events.filter((e) => e.status === status);

  return (
    <>
      <Head>
        <title>Events | Community | nbcon.ai</title>
        <meta name="description" content="Upcoming community events and meetups" />
      </Head>

      <SimpleHeroSection
        headline="Community Events"
        description="Join us for meetups, webinars, workshops, and more"
        backgroundVariant="minimal"
      />

      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <Select value={status} onValueChange={(value) => setStatus(value as any)}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={eventType || "all"} onValueChange={(value) => setEventType(value === "all" ? undefined : value)}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Event Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="meetup">Meetup</SelectItem>
              <SelectItem value="webinar">Webinar</SelectItem>
              <SelectItem value="conference">Conference</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="hackathon">Hackathon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="body-large">Loading events...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="body-large text-destructive">{error}</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="body-large">No events found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

