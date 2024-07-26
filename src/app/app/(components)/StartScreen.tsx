import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import quotes from "@/content/quotes.json";
import { CheckIcon, TriangleAlert, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface StartScreenProps {
  visible: boolean;
  onStart: () => void;
  correctHits: number | null;
  incorrectHits: number | null;
  missedHits: number | null;
}

export default function StartScreen({
  visible,
  onStart,
  correctHits,
  incorrectHits,
  missedHits,
}: StartScreenProps) {
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
        {correctHits === null &&
        incorrectHits === null &&
        missedHits === null ? (
          <>
            <DialogTitle className="mb-6 text-3xl text-slate-900">
              Welcome back!
            </DialogTitle>
            <blockquote className="font-serif text-lg font-normal italic text-slate-600">
              <div className="mb-1">&ldquo;{quote}&rdquo;</div>
              <div className="text-right text-xl text-slate-700">
                &mdash; {author}
              </div>
            </blockquote>
          </>
        ) : (
          <>
            <DialogTitle className="mb-6 text-3xl text-slate-900">
              Well played!
            </DialogTitle>
            <div className="divide flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-slate-300/50 bg-white p-2">
              <div className="flex flex-col gap-1 text-lg">
                <div className="flex items-center gap-2 rounded-md bg-green-200 py-2 pl-4 pr-10 text-green-950">
                  <CheckIcon className="h-6 w-6" />
                  <div>
                    <span className="font-semibold">{correctHits}</span> correct
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-red-200 py-2 pl-4 pr-10 text-red-950">
                  <XIcon className="h-6 w-6" />
                  <div>
                    <span className="font-semibold">{incorrectHits}</span>{" "}
                    incorrect
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-yellow-200 py-2 pl-4 pr-10 text-yellow-950">
                  <TriangleAlert className="h-6 w-6" />
                  <div>
                    <span className="font-semibold">{missedHits}</span> missed
                  </div>
                </div>
              </div>
              <div className="h-[calc(100%+1rem)] border-l border-slate-200"></div>
              <div className="flex h-full w-full flex-col gap-1 text-lg">
                <div className="flex items-center gap-2 rounded-md bg-green-200 py-2 pl-4 pr-10 text-green-950">
                  <CheckIcon className="h-6 w-6" />
                  <div>
                    <span className="font-semibold">{correctHits}</span> correct
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <Button
          className="mt-14 justify-center border border-orange-400/50 bg-orange-300 py-5 text-4xl font-bold uppercase tracking-wide text-slate-950 transition duration-200 hover:border-orange-500/50 hover:bg-orange-400 hover:shadow-lg focus-visible:ring-opacity-0 active:shadow-sm"
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
