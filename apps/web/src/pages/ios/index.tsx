import React from "react";
import Head from "next/head";

export default function IOSPage() {
  return (
    <>
      <Head>
        <title>iOS App | NBCON PRO</title>
      </Head>
      <main className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">NBCON PRO for iOS</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Access your Survey and GIS projects anywhere. Sync, collect, and analyze data on the go.
        </p>
        <div className="flex justify-center gap-4">
          <a href="#" className="px-4 py-2 bg-primary text-white rounded-lg">Download on App Store</a>
          <a href="#" className="px-4 py-2 border rounded-lg">Learn More</a>
        </div>
      </main>
    </>
  );
}

