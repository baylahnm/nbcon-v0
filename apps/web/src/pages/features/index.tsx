import Head from "next/head";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { AgentFeatureSection } from "@/components/features/AgentFeatureSection";
import { AutocompleteFeatureSection } from "@/components/features/AutocompleteFeatureSection";
import { IntegrationsFeatureSection } from "@/components/features/IntegrationsFeatureSection";
import { ConfigurationFeatureSection } from "@/components/features/ConfigurationFeatureSection";
import { ChangelogPreview } from "@/components/features/ChangelogPreview";
import { FeaturesCTASection } from "@/components/features/FeaturesCTASection";

export default function FeaturesPage() {
  return (
    <>
      <Head>
        <title>Features | nbcon.ai</title>
        <meta
          name="description"
          content="Discover powerful AI-driven features for engineering excellence. Delegate tasks to AI agents, use smart autocomplete, integrate with your workflow, and customize everything."
        />
        <meta property="og:title" content="Features | nbcon.ai" />
        <meta
          property="og:description"
          content="We streamline workflows and boost productivity with AI-driven tools designed for engineering excellence."
        />
      </Head>
      <SimpleHeroSection
        headline="The best way to build engineering software"
        description="We streamline workflows and boost productivity with AI-driven tools designed for engineering excellence."
        cta={{
          primary: {
            text: "Get Started",
            href: "/auth/signup",
          },
          secondary: {
            text: "View Pricing",
            href: "/pricing",
          },
        }}
        backgroundVariant="minimal"
      />
      <AgentFeatureSection />
      <AutocompleteFeatureSection />
      <IntegrationsFeatureSection />
      <ConfigurationFeatureSection />
      <ChangelogPreview />
      <FeaturesCTASection />
    </>
  );
}

