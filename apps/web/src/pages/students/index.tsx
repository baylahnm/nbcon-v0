import React from "react";
import Head from "next/head";

export default function StudentsPage() {
  return (
    <>
      <Head>
        <title>Students | NBCON PRO</title>
      </Head>
      <main className="container py-20">
        <h1 className="text-3xl font-bold mb-4">Students & Education</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Empowering the next generation of engineers through hands-on learning and free access to NBCON tools.
        </p>
        <ul className="space-y-4 text-muted-foreground">
          <li>🎓 Academic License — Free access to AI tools.</li>
          <li>🏆 Engineering Challenges & Hackathons.</li>
          <li>💼 Internship & Ambassador Programs.</li>
        </ul>
      </main>
    </>
  );
}

