"use client";

import React from 'react';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

export function FaqsSection() {
	return (
		<div className="mx-auto w-full max-w-3xl space-y-7 px-4 pt-16 pb-20">
			<div className="space-y-2">
				<h2 className="text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
				<p className="text-muted-foreground max-w-2xl">
					Find answers to common questions about nbcon.ai. If you don't find what you're looking for, feel free to reach out to our support team.
				</p>
			</div>
			<Accordion
				type="single"
				collapsible
				className="bg-card dark:bg-card/50 w-full -space-y-px rounded-lg "
				defaultValue="item-1"
			>
				{questions.map((item) => (
					<AccordionItem
						value={item.id}
						key={item.id}
						className="relative border-x border-border dark:border-border/50 first:rounded-t-lg first:border-t first:border-border dark:first:border-border/50 last:rounded-b-lg last:border-b last:border-border dark:last:border-border/50"
					>
						<AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
							{item.title}
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground pb-4 px-4">
							<div className="space-y-2">
								{item.content}
								{item.link && (
									<div className="pt-2">
										<Link href={item.link} className="text-primary hover:underline text-sm font-medium">
											{item.linkText} →
										</Link>
									</div>
								)}
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
			<div className="space-y-4 pt-4">
				<p className="text-muted-foreground">
					Can't find what you're looking for? Contact our{' '}
					<Link href="mailto:support@nbcon.ai" className="text-primary hover:underline">
						customer support team
					</Link>
					{' '}or check our{' '}
					<Link href="/docs" className="text-primary hover:underline">
						documentation
					</Link>
					.
				</p>
				<div className="flex flex-wrap gap-4 text-sm">
					<Link href="/billing" className="text-primary hover:underline">Pricing & Plans</Link>
					<Link href="/legal/privacy" className="text-primary hover:underline">Privacy & PDPL</Link>
					<Link href="/legal/cancellations" className="text-primary hover:underline">Cancellations</Link>
					<Link href="/legal/refunds" className="text-primary hover:underline">Refunds</Link>
					<Link href="/enterprise" className="text-primary hover:underline">Enterprise</Link>
					<Link href="/status" className="text-primary hover:underline">Status</Link>
				</div>
			</div>
		</div>
	);
}

const questions = [
	{
		id: 'item-1',
		title: 'What is nbcon.ai?',
		content: (
			<p>
				nbcon.ai is a KSA marketplace for on-demand engineering services. Clients book work; verified Engineers deliver—payments, messaging, AI tools, and compliance in one place.
			</p>
		),
	},
	{
		id: 'item-2',
		title: 'Who can use nbcon.ai?',
		content: (
			<p>
				Two roles: <strong>Client</strong> (requests services) and <strong>Engineer</strong> (Civil, Survey, GIS, Mechanical, Electrical, etc.). You can switch roles in <strong>Settings → Roles</strong>.
			</p>
		),
	},
	{
		id: 'item-3',
		title: 'Where is nbcon.ai available?',
		content: (
			<p>
				Saudi Arabia (Vision 2030 aligned). More regions to follow.
			</p>
		),
	},
	{
		id: 'item-4',
		title: 'How do I create an account?',
		content: (
			<p>
				Go to <Link href="/auth/signup" className="text-primary hover:underline">/auth/signup</Link>, verify your email, then complete your profile.
			</p>
		),
	},
	{
		id: 'item-5',
		title: 'How do Engineers get verified?',
		content: (
			<p>
				Upload Saudi Council of Engineers license/documents, ID, and portfolio. Reviews typically complete within 24–72 hours.
			</p>
		),
		link: '/settings/verification',
		linkText: 'Start verification',
	},
	{
		id: 'item-6',
		title: 'How do bookings work?',
		content: (
			<p>
				Create a job (scope, location, date, budget). Engineers respond with offers or instant-book if enabled.
			</p>
		),
	},
	{
		id: 'item-7',
		title: 'Can I schedule site visits?',
		content: (
			<p>
				Yes. Pick available slots on the job page. You'll see ETA and live status when tracking is enabled.
			</p>
		),
	},
	{
		id: 'item-8',
		title: 'What are your plans and prices?',
		content: (
			<ul className="list-disc list-inside space-y-1 ml-2">
				<li><strong>Free:</strong> 0 SAR/month — 50 AI tokens/day</li>
				<li><strong>Basic:</strong> 49 SAR/month — 500 AI tokens/day</li>
				<li><strong>Pro:</strong> 149 SAR/month — 2000 AI tokens/day</li>
				<li><strong>Enterprise:</strong> Custom — bespoke limits & SLAs</li>
			</ul>
		),
		link: '/billing',
		linkText: 'View pricing',
	},
	{
		id: 'item-9',
		title: 'What are AI tokens?',
		content: (
			<p>
				Daily allowance to use nbcon.ai's AI (chat, tools, domain agents). Resets nightly.
			</p>
		),
	},
	{
		id: 'item-10',
		title: 'How do I pay?',
		content: (
			<p>
				Hosted checkout with <strong>Stripe</strong> (SAR) and local gateways (as available). Your card details are never stored on nbcon.ai.
			</p>
		),
	},
	{
		id: 'item-11',
		title: 'How do Engineers get paid?',
		content: (
			<p>
				Funds are released after <strong>milestone/client acceptance</strong>. Payouts follow gateway timelines.
			</p>
		),
	},
	{
		id: 'item-12',
		title: 'Do you support escrow?',
		content: (
			<p>
				Yes. Project funds are held until milestones are approved.
			</p>
		),
	},
	{
		id: 'item-13',
		title: "What can nbcon.ai's AI do?",
		content: (
			<p>
				Draft scopes, validate quantities, generate checklists, and assist with Survey/GIS/Civil calculations. It does <strong>not</strong> replace licensed engineering sign-off.
			</p>
		),
	},
	{
		id: 'item-14',
		title: 'Which AI models are supported?',
		content: (
			<p>
				OpenAI (GPT-4o/5), Anthropic (Claude), Google (Gemini), Mistral, etc., routed via a <strong>unified provider switch</strong>. Your plan controls daily tokens.
			</p>
		),
	},
	{
		id: 'item-15',
		title: 'Is my data used to train external models?',
		content: (
			<p>
				No, unless you explicitly opt-in. See our privacy policy for details.
			</p>
		),
		link: '/legal/privacy',
		linkText: 'Privacy policy',
	},
	{
		id: 'item-16',
		title: 'How is my data protected?',
		content: (
			<p>
				KSA <strong>PDPL</strong> aligned. Encryption at rest/in transit, strict RLS (Row-Level Security), least-privilege access.
			</p>
		),
		link: '/legal/privacy',
		linkText: 'Learn more',
	},
	{
		id: 'item-17',
		title: 'Can I export my data?',
		content: (
			<p>
				Yes. <strong>Settings → Privacy → Export</strong>.
			</p>
		),
	},
	{
		id: 'item-18',
		title: 'How are Engineers vetted?',
		content: (
			<p>
				License verification, document checks, and performance reviews. High-risk categories require enhanced checks.
			</p>
		),
	},
	{
		id: 'item-19',
		title: "What if there's a dispute?",
		content: (
			<p>
				Use <strong>Dispute Resolution</strong> on the booking. We review scope, messages, deliverables, and milestone proofs.
			</p>
		),
	},
	{
		id: 'item-20',
		title: 'What file formats are supported?',
		content: (
			<p>
				DXF, DWG, CSV, SHP, LAS/LAZ, GeoJSON, and common export formats.
			</p>
		),
		link: '/docs/file-formats',
		linkText: 'View all formats',
	},
	{
		id: 'item-21',
		title: 'How do I get help?',
		content: (
			<ul className="list-disc list-inside space-y-1 ml-2">
				<li>In-app: <strong>Help → Contact Support</strong></li>
				<li>Email: <Link href="mailto:support@nbcon.ai" className="text-primary hover:underline">support@nbcon.ai</Link></li>
				<li>Enterprise: <Link href="mailto:enterprise@nbcon.ai" className="text-primary hover:underline">enterprise@nbcon.ai</Link></li>
				<li>Status: <Link href="/status" className="text-primary hover:underline">/status</Link></li>
			</ul>
		),
	},
];


