import React from "react";
import Head from "next/head";

export default function EnterprisePage() {
  return (
    <>
      <Head>
        <title>Enterprise | NBCON PRO</title>
      </Head>
      <main className="container py-20">
        <h1 className="text-3xl font-bold mb-4">NBCON PRO for Enterprise</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Unlock secure integrations, compliance, and large-scale data automation for engineering teams.
        </p>
        <ul className="grid gap-6 sm:grid-cols-2">
          <li className="border p-4 rounded-lg hover:bg-accent transition">
            <h3 className="font-semibold">Enterprise SDK</h3>
            <p className="text-sm text-muted-foreground">Integrate NBCON APIs, telemetry, and automation tools.</p>
          </li>
          <li className="border p-4 rounded-lg hover:bg-accent transition">
            <h3 className="font-semibold">Compliance & Security</h3>
            <p className="text-sm text-muted-foreground">PDPL, ISO 27001, and SOC 2 ready environment.</p>
          </li>
        </ul>
      </main>
    </>
  );
}

