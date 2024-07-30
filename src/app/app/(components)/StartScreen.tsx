import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import quotes from "@/content/quotes.json";
import { cn } from "@/lib/cn";
import {
  gameDecreaseLevelThreshold,
  gameIncreaseLevelThreshold,
} from "@/settings/constants";
import { cva } from "class-variance-authority";
import {
  CheckIcon,
  CrosshairIcon,
  MoveDownRightIcon,
  MoveRightIcon,
  MoveUpRightIcon,
  TriangleAlert,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

const boxVariants = cva("flex items-center gap-2 rounded-md py-2 pl-4", {
  variants: {
    size: { small: "pr-10 ", big: "" },
    color: {
      green: "bg-green-200 text-green-950",
      red: "bg-red-200 text-red-950",
      yellow: "bg-yellow-200 text-yellow-950",
      blue: "bg-sky-200 text-sky-950",
      orange: "bg-orange-200 text-orange-950",
    },
  },
});

interface StartScreenProps {
  visible: boolean;
  onStart: () => void;
  correctHits: number | null;
  incorrectHits: number | null;
  missedHits: number | null;
  newLevel: number | null;
}

export default function StartScreen({
  visible,
  onStart,
  correctHits,
  incorrectHits,
  missedHits,
  newLevel,
}: StartScreenProps) {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const hasStatistics =
    correctHits !== null && incorrectHits !== null && missedHits !== null;
  let accuracy = 0;
  if (hasStatistics) {
    accuracy = Math.floor(
      (correctHits / (correctHits + incorrectHits + missedHits)) * 100,
    );
  }

  let previousLevel = newLevel ?? 0;
  if (hasStatistics) {
    previousLevel -= Number(accuracy >= gameIncreaseLevelThreshold * 100);
    previousLevel += Number(accuracy <= gameDecreaseLevelThreshold * 100);
    previousLevel = Math.max(1, previousLevel);
  }

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
        {!hasStatistics ? (
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
                <div
                  className={cn(boxVariants({ size: "small", color: "green" }))}
                >
                  <CheckIcon className="h-6 w-6" />
                  <div>
                    <span className="font-semibold">{correctHits}</span> correct
                  </div>
                </div>
                <div
                  className={cn(boxVariants({ size: "small", color: "red" }))}
                >
                  <XIcon className="h-6 w-6" />
                  <div>
                    <span className="font-semibold">{incorrectHits}</span>{" "}
                    incorrect
                  </div>
                </div>
                <div
                  className={cn(
                    boxVariants({ size: "small", color: "yellow" }),
                  )}
                >
                  <TriangleAlert className="h-6 w-6" />
                  <div>
                    <span className="font-semibold">{missedHits}</span> missed
                  </div>
                </div>
              </div>

              <div className="h-[calc(100%+1rem)] border-l border-slate-200"></div>

              <div className="flex h-full w-full flex-col gap-1 text-lg">
                {accuracy >= gameIncreaseLevelThreshold * 100 ? (
                  <>
                    <div
                      className={cn(
                        boxVariants({ size: "big", color: "green" }),
                      )}
                    >
                      <CrosshairIcon className="h-6 w-6" />
                      <div>
                        <span className="font-semibold">{accuracy}%</span>{" "}
                        accuracy
                      </div>
                    </div>
                    <div
                      className={cn(
                        boxVariants({
                          size: "big",
                          color: "green",
                        }),
                      )}
                    >
                      <MoveUpRightIcon className="h-6 w-6" />
                      <div className="font-medium">Level Increased</div>
                    </div>
                  </>
                ) : accuracy <= gameDecreaseLevelThreshold * 100 ? (
                  <>
                    <div
                      className={cn(boxVariants({ size: "big", color: "red" }))}
                    >
                      <CrosshairIcon className="h-6 w-6" />
                      <div>
                        <span className="font-semibold">{accuracy}%</span>{" "}
                        accuracy
                      </div>
                    </div>
                    <div
                      className={cn(boxVariants({ size: "big", color: "red" }))}
                    >
                      <MoveDownRightIcon className="h-6 w-6" />
                      <div className="font-medium">Level Decreased</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={cn(
                        boxVariants({ size: "big", color: "blue" }),
                      )}
                    >
                      <CrosshairIcon className="h-6 w-6" />
                      <div>
                        <span className="font-semibold">{accuracy}%</span>{" "}
                        accuracy
                      </div>
                    </div>
                    <div
                      className={cn(
                        boxVariants({ size: "big", color: "blue" }),
                      )}
                    >
                      <MoveRightIcon className="h-6 w-6" />
                      <div className="font-medium">Level Maintained</div>
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between gap-3 text-center font-medium">
                  <div
                    className={cn(
                      boxVariants({
                        size: "big",
                        color: "orange",
                        className: "w-full justify-center px-0",
                      }),
                    )}
                  >
                    Level {previousLevel}
                  </div>
                  <MoveRightIcon className="h-6 w-6 flex-shrink-0 text-slate-900" />
                  <div
                    className={cn(
                      boxVariants({
                        size: "big",
                        color: "orange",
                        className: "w-full justify-center px-0",
                      }),
                    )}
                  >
                    Level {newLevel ?? 0}
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
