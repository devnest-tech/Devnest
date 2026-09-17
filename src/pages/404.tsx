import Head from "next/head";
import Link from "next/link";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Home, Compass, ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <Head>
        <title>DevNest | 404 - Page Not Found</title>
      </Head>

      <div className="relative min-h-[calc(100vh-200px)] flex items-center justify-center py-20">
        {/* Glow ambient background */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden flex items-center justify-center">
          <div className="w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="badge-pill mb-6 mx-auto inline-flex">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span>HTTP 404</span>
            <span className="text-muted-foreground/60">•</span>
            <span className="text-foreground/80 font-medium">Route Lost</span>
          </div>

          <h1 className="text-7xl sm:text-9xl font-black font-poppins tracking-tighter text-gradient-primary mb-4 select-none">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-foreground mb-3">
            Lost in the Digital Nest?
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
            The page you are trying to reach doesn&apos;t exist or has been relocated to another node.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="rounded-xl h-11 px-6 shadow-subtle gap-2">
              <Link href="/">
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </Link>
            </Button>

            <Button asChild variant="outline" className="rounded-xl h-11 px-6 border-border/80 gap-2">
              <Link href="/events">
                <Compass className="w-4 h-4" />
                <span>Explore Events</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
