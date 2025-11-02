import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/theme.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Carter+One&family=Quintessential&family=Alice&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

