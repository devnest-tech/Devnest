import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Shield } from "lucide-react";

export default function LegacyAdminMembersPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/devnest");
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Head>
        <title>Redirecting to DevNest Admin...</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 animate-pulse">
        <Shield className="w-6 h-6" />
      </div>
      <p className="text-sm font-medium text-muted-foreground">
        Redirecting to DevNest Admin Portal (/admin/devnest)...
      </p>
    </div>
  );
}
