import React from "react";
import Head from "next/head";
import { FaqsSection } from "@/components/ui/faqs-1";
import type { GetServerSideProps } from "next";

export default function FAQPage() {
  return (
    <>
      <Head>
        <title>FAQ | nbcon.ai</title>
      </Head>
      <main className="min-h-screen bg-background">
        <FaqsSection />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

