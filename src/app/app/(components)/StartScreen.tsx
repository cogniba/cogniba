import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import quotes from "@/content/quotes.json";
import { useEffect, useState } from "react";

interface StartScreenProps {
  visible: boolean;
  onStart: () => void;
}

export default function StartScreen({ visible, onStart }: StartScreenProps) {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const { quote: fetchedQuote, author: fetchedAuthor } =
      quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(fetchedQuote);
    setAuthor(fetchedAuthor);
  }, []);

  return (
    <Dialog defaultOpen open={visible}>
      <DialogContent
        className="max-w-lg bg-slate-50"
        closeButton={false}
        aria-describedby="Start screen. Press 'Play' to start playing"
      >
        <DialogTitle className="mb-6 text-3xl text-slate-900">
          Welcome back!
        </DialogTitle>
        <blockquote className="font-serif text-lg font-normal italic text-slate-600">
          <div className="mb-1">&ldquo;{quote}&rdquo;</div>
          <div className="text-right text-xl text-slate-700">
            &mdash; {author}
          </div>
        </blockquote>
        <Button
          className="mt-14 justify-center py-5 text-4xl font-semibold"
          size="custom"
          type="submit"
          onClick={onStart}
        >
          Play
        </Button>
      </DialogContent>
    </Dialog>
  );
}
