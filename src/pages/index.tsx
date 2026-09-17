import Head from "next/head";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { HomeHighlights } from "@/components/HomeHighlights";

export default function Index() {
  return (
    <Layout>
      <Head>
        <title>DevNest | Home</title>
      </Head>

      <Hero />

      <HomeHighlights />
    </Layout>
  );
}