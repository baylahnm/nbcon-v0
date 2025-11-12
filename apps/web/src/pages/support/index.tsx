"use client";

import { useRef } from "react";
import Head from "next/head";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { QuickHelpCards } from "@/components/support/QuickHelpCards";
import { SupportChannels } from "@/components/support/SupportChannels";
import { SupportTicketForm } from "@/components/support/SupportTicketForm";
import { TicketStatusCheck } from "@/components/support/TicketStatusCheck";
import { SupportHours } from "@/components/support/SupportHours";
import { SelfServiceResources } from "@/components/support/SelfServiceResources";

export default function SupportPage() {
  const ticketFormRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    ticketFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Head>
        <title>Support | nbcon.ai</title>
        <meta name="description" content="Get help, submit support tickets, and access self-service resources" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "nbcon.ai Support",
              description: "Customer support and help center for nbcon.ai",
              provider: {
                "@type": "Organization",
                name: "nbcon.ai",
              },
            }),
          }}
        />
      </Head>

      <SimpleHeroSection
        headline="Get Support"
        description="We're here to help! Find answers, submit tickets, or contact our support team"
        cta={{
          primary: {
            text: "Submit a Ticket",
            onClick: scrollToForm,
          },
          secondary: {
            text: "Browse FAQ",
            href: "/faq",
          },
        }}
        backgroundVariant="minimal"
      />

      <main className="container mx-auto px-4 py-12 md:py-20 space-y-16">
        {/* Quick Help Cards */}
        <section>
          <QuickHelpCards />
        </section>

        {/* Support Channels */}
        <section>
          <SupportChannels />
        </section>

        {/* Submit Support Ticket */}
        <section ref={ticketFormRef}>
          <SupportTicketForm />
        </section>

        {/* Ticket Status Check */}
        <section>
          <TicketStatusCheck />
        </section>

        {/* Support Hours */}
        <section>
          <SupportHours />
        </section>

        {/* Self-Service Resources */}
        <section>
          <SelfServiceResources />
        </section>
      </main>
    </>
  );
}

