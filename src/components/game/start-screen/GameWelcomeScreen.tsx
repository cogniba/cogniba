"use client";

import { DialogTitle } from "@/components/ui/dialog";
import { useMemo } from "react";
import quotes from "@/content/quotes.json";

export default function GameWelcomeScreen() {
  const { quote, author } = useMemo(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []);

  return (
    <>
      <DialogTitle className="xs:mb-8 xs:text-3xl mb-5 text-2xl">
        Welcome back!
      </DialogTitle>
      <blockquote className="text-muted-foreground xs:text-lg font-serif text-base font-normal italic">
        <div className="xs:mb-1">&ldquo;{quote}&rdquo;</div>
        <div className="text-muted-foreground xs:text-xl text-right text-lg">
          &mdash; {author}
        </div>
      </blockquote>
    </>
  );
}
