import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import "@/global.css";
import "@/styles/arcade.css";
import "@/components/Stepper/Stepper.css";

import Head from "next/head";
import { JoinModalProvider } from "@/context/JoinModalContext";
import ClickSpark from "@/components/ClickSpark";

export default function DevnestApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <JoinModalProvider>
            <ClickSpark
              sparkColor="#000000"
              sparkSize={10}
              sparkRadius={18}
              sparkCount={8}
              duration={400}
            >
              <Component {...pageProps} />
            </ClickSpark>
          </JoinModalProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
