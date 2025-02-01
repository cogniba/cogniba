"use client";

import { DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import quotes from "@/content/quotes.json";

export default function GameWelcomeScreen() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const { quote: fetchedQuote, author: fetchedAuthor } =
      quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(fetchedQuote);
    setAuthor(fetchedAuthor);
  }, []);

  return (
    <>
      <DialogTitle className="mb-5 text-2xl xs:mb-8 xs:text-3xl">
        Welcome back!
      </DialogTitle>
      <blockquote className="font-serif text-base font-normal italic text-muted-foreground xs:text-lg">
        <div className="xs:mb-1">&ldquo;{quote}&rdquo;</div>
        <div className="text-right text-lg text-muted-foreground xs:text-xl">
          &mdash; {author}
        </div>
      </blockquote>
    </>
  );
}
