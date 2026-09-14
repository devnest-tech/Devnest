import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Sparkles } from "lucide-react";

export default function JoinRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/membership");
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Head>
        <title>DevNest | Redirecting to Official Membership...</title>
        <meta name="description" content="Redirecting to official DevNest membership registration" />
      </Head>
      <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 animate-pulse">
        <Sparkles className="w-6 h-6" />
      </div>
      <p className="text-sm font-medium text-muted-foreground">
        Redirecting to official DevNest Membership Registration...
      </p>
    </div>
  );
}