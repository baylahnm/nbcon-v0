import React from "react";
import Head from "next/head";

export default function PricingPage() {
  return (
    <>
      <Head>
        <title>Pricing | NBCON PRO</title>
      </Head>
      <main className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Pricing Plans</h1>
        <p className="text-muted-foreground mb-8">Choose a plan that fits your workflow and scale as you grow.</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">Basic</h3>
            <p className="text-muted-foreground mb-4">Ideal for individuals.</p>
            <p className="text-2xl font-bold mb-4">Free</p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">Pro</h3>
            <p className="text-muted-foreground mb-4">For small teams & professionals.</p>
            <p className="text-2xl font-bold mb-4">SAR 249/mo</p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">Enterprise</h3>
            <p className="text-muted-foreground mb-4">Custom integrations & support.</p>
            <p className="text-2xl font-bold mb-4">Contact Us</p>
          </div>
        </div>
      </main>
    </>
  );
}

