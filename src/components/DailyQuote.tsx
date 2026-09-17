import { useState, useEffect } from "react";
import { Lightbulb, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import quotesData from "@/data/quotes.json";
import DecryptedText from "@/components/DecryptedText";

interface Quote {
  text: string;
  author: string;
  category: string;
}

export function DailyQuote() {
  const quotes: Quote[] = quotesData.quotes;
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [quoteKey, setQuoteKey] = useState(0);

  useEffect(() => {
    // Get a random quote on component mount
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }
  }, [quotes]);

  const getNewQuote = () => {
    if (quotes.length > 0) {
      let randomIndex = Math.floor(Math.random() * quotes.length);
      const currentIndex = quotes.findIndex((q) => q.text === currentQuote?.text);
      if (quotes.length > 1 && randomIndex === currentIndex) {
        randomIndex = (randomIndex + 1) % quotes.length;
      }
      setCurrentQuote(quotes[randomIndex]);
      setQuoteKey((prev) => prev + 1);
    }
  };

  if (!currentQuote) return null;

  return (
    <section className="relative my-12 glass-panel rounded-3xl p-8 sm:p-12 border border-border/80 shadow-premium overflow-hidden text-left">
      {/* Decorative quotation watermark in background */}
      <div
        aria-hidden="true"
        className="absolute -right-2 -bottom-10 text-foreground/[0.03] select-none pointer-events-none font-serif text-[180px] leading-none"
      >
        ”
      </div>

      <div className="relative z-10 max-w-4xl flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex-1">
          <div className="badge-pill mb-5">
            <Lightbulb className="w-3.5 h-3.5 text-primary" />
            <span>Quote of the Day</span>
            <span className="text-muted-foreground/60">•</span>
            <span className="text-foreground/80 font-medium">{currentQuote.category}</span>
          </div>

          <div className="text-xl sm:text-2xl md:text-3xl font-poppins font-medium text-foreground tracking-tight leading-snug mb-4">
            <DecryptedText
              key={quoteKey}
              text={`"${currentQuote.text}"`}
              animateOn="view"
              speed={30}
              maxIterations={15}
              className="inline-block"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground/90">— {currentQuote.author}</span>
          </div>
        </div>

        <div className="shrink-0">
          <Button
            onClick={getNewQuote}
            variant="outline"
            size="sm"
            className="rounded-xl border-border/80 hover:border-primary/40 hover:bg-primary/5 hover:text-primary gap-2 shadow-subtle transition-all duration-200 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-primary" />
            <span>Refresh Quote</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
