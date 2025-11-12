import React from "react";
import Head from "next/head";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { PricingSection } from "@/components/ui/pricing";

const PLANS = [
	{
		name: 'Free',
		info: 'Perfect for getting started',
		price: {
			monthly: 0,
			yearly: 0,
		},
		features: [
			{ text: '1 Project' },
			{ text: '50 AI tokens/day', tooltip: 'AI tokens for chat, tools, and domain agents' },
			{ text: 'Dashboard access' },
			{ text: 'Basic projects', tooltip: 'Create and manage basic engineering projects' },
			{ text: 'Community support', tooltip: 'Get help from our community on Discord' },
		],
		btn: {
			text: 'Get Started',
			href: '/auth/signup',
		},
	},
	{
		name: 'Basic',
		info: 'For individuals and small projects',
		price: {
			monthly: 49,
			yearly: Math.round(49 * 12 * (1 - 0.15)), // 15% discount for yearly
		},
		features: [
			{ text: '3 Projects' },
			{ text: '500 AI tokens/day', tooltip: 'AI tokens for chat, tools, and domain agents' },
			{ text: 'Everything in Free' },
			{ text: 'Email support', tooltip: 'Get help via email from our support team' },
		],
		btn: {
			text: 'Get Started',
			href: '/auth/signup',
		},
	},
	{
		highlighted: true,
		name: 'Pro',
		info: 'For professionals and small teams',
		price: {
			monthly: 149,
			yearly: Math.round(149 * 12 * (1 - 0.15)), // 15% discount for yearly
		},
		features: [
			{ text: 'Unlimited Projects' },
			{ text: '2,000 AI tokens/day', tooltip: 'AI tokens for chat, tools, and domain agents' },
			{ text: 'Everything in Basic' },
			{ text: 'AI Co-Pilot', tooltip: 'Advanced AI assistance for engineering workflows' },
			{ text: 'Team Collaboration', tooltip: 'Invite team members and work together' },
			{ text: 'Advanced Reports', tooltip: 'Detailed analytics and project insights' },
			{ text: 'Priority Support', tooltip: 'Get 24/7 priority support via email' },
		],
		btn: {
			text: 'Get Started',
			href: '/auth/signup',
		},
	},
	{
		name: 'Enterprise',
		info: 'For large organizations',
		price: {
			monthly: 0, // Custom pricing - will display "Custom"
			yearly: 0,
		},
		features: [
			{ text: 'Everything in Pro' },
			{ text: 'Unlimited AI tokens', tooltip: '999,999 AI tokens/day - no daily limits' },
			{ text: 'Unlimited Projects' },
			{ text: 'Custom Integrations', tooltip: 'Integrate with your existing tools and workflows' },
			{ text: 'Dedicated Support', tooltip: 'Dedicated account manager and support team' },
			{ text: 'SLA Guarantee', tooltip: 'Service level agreement with uptime guarantees' },
			{ text: 'Custom Training', tooltip: 'Onboarding and training for your team' },
		],
		btn: {
			text: 'Contact Sales',
			href: '/enterprise',
		},
	},
];

export default function PricingPage() {
	return (
		<>
			<Head>
				<title>Pricing | nbcon.ai</title>
			</Head>
			<SimpleHeroSection
				headline="Plans that Scale with You"
				description="Whether you're just starting out or growing fast, our flexible pricing has you covered — with no hidden costs."
				backgroundVariant="minimal"
			/>
			<main className="flex min-h-screen items-center justify-center py-12">
				<PricingSection
					plans={PLANS}
					heading=""
					description=""
				/>
			</main>
		</>
	);
}

