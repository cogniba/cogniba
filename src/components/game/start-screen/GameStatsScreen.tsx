"use client";

import { DialogTitle } from "@/components/ui/dialog";
import calculateAccuracy from "@/lib/calculateAccuracy";
import { cn } from "@/lib/cn";
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

const boxVariants = cva("flex items-center gap-2 rounded-md py-2 pl-4 border", {
  variants: {
    size: { small: "pr-10 ", big: "" },
    color: {
      green:
        "bg-green-200 text-green-950 border-green-300/50 dark:bg-green-950 dark:text-green-50 dark:border-green-900",
      red: "bg-red-200 text-red-950 border-red-300/50 dark:bg-red-950 dark:text-red-50 dark:border-red-900",
      yellow:
        "bg-yellow-200 text-yellow-950 border-yellow-300/50 dark:bg-yellow-950 dark:text-yellow-50 dark:border-yellow-900",
      blue: "bg-sky-200 text-sky-950 border-sky-300/50 dark:bg-sky-950 dark:text-sky-50 dark:border-sky-900",
      orange:
        "bg-orange-200 text-orange-950 border-orange-300/50 dark:bg-orange-950 dark:text-orange-50 dark:border-orange-900",
    },
  },
});

interface GameStatsScreenProps {
  correctHits: number;
  incorrectHits: number;
  missedHits: number;
  previousLevel: number;
  newLevel: number;
}

export default function GameStatsScreen({
  correctHits,
  incorrectHits,
  missedHits,
  previousLevel,
  newLevel,
}: GameStatsScreenProps) {
  const accuracy = Math.round(
    calculateAccuracy({ correctHits, incorrectHits, missedHits }) * 100,
  );

  return (
    <>
      <DialogTitle className="mb-5 text-2xl xs:mb-6 xs:text-3xl">
        Well played!
      </DialogTitle>
      <div className="flex flex-col items-center justify-center gap-2 whitespace-nowrap rounded-lg border p-2 xs:flex-row">
        <div className="flex w-full flex-col gap-1 text-base xs:w-fit xs:text-lg">
          <div className={cn(boxVariants({ size: "small", color: "green" }))}>
            <CheckIcon className="size-5 xs:size-6" />
            <div>
              <span className="font-semibold">{correctHits}</span> correct
            </div>
          </div>
          <div className={cn(boxVariants({ size: "small", color: "red" }))}>
            <XIcon className="size-5 xs:size-6" />
            <div>
              <span className="font-semibold">{incorrectHits}</span> incorrect
            </div>
          </div>
          <div className={cn(boxVariants({ size: "small", color: "yellow" }))}>
            <TriangleAlert className="size-5 xs:size-6" />
            <div>
              <span className="font-semibold">{missedHits}</span> missed
            </div>
          </div>
        </div>

        <div className="hidden h-[calc(100%+1rem)] border-l xs:block"></div>
        <div className="block w-[calc(100%+1rem)] border-t xs:hidden"></div>

        <div className="flex h-full w-full flex-col gap-1 text-base xs:text-lg">
          <div
            className={cn(
              boxVariants({
                size: "big",
                color:
                  newLevel > previousLevel
                    ? "green"
                    : newLevel === previousLevel
                      ? "blue"
                      : "red",
              }),
            )}
          >
            <CrosshairIcon className="size-5 xs:size-6" />
            <div>
              <span className="font-semibold">{accuracy}%</span> accuracy
            </div>
          </div>
          {newLevel > previousLevel && (
            <div
              className={cn(
                boxVariants({
                  size: "big",
                  color: "green",
                }),
              )}
            >
              <MoveUpRightIcon className="size-5 xs:size-6" />
              <div className="font-medium">Level Increased</div>
            </div>
          )}
          {newLevel === previousLevel && (
            <div className={cn(boxVariants({ size: "big", color: "blue" }))}>
              <MoveRightIcon className="size-5 xs:size-6" />
              <div className="font-medium">Level Maintained</div>
            </div>
          )}
          {newLevel < previousLevel && (
            <div className={cn(boxVariants({ size: "big", color: "red" }))}>
              <MoveDownRightIcon className="size-5 xs:size-6" />
              <div className="font-medium">Level Decreased</div>
            </div>
          )}
          <div className="hidden items-center justify-between gap-3 text-center font-medium xs:flex">
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
            <MoveRightIcon className="size-5 flex-shrink-0 xs:size-6" />
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
  );
}
