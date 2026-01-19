"use client";

import { DialogTitle } from "@/components/ui/dialog";
import { useGameContext } from "@/context/GameContext";
import calculateAccuracy from "@/lib/game/game-logic/calculateAccuracy";
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

export default function GameStatsScreen() {
  const { correctHits, incorrectHits, missedHits, previousLevel, level } =
    useGameContext();

  if (correctHits === null || incorrectHits === null || missedHits === null) {
    return null;
  }

  const accuracy = Math.round(
    calculateAccuracy({ correctHits, incorrectHits, missedHits }) * 100,
  );

  return (
    <>
      <DialogTitle className="xs:mb-6 xs:text-3xl mb-5 text-2xl">
        Well played!
      </DialogTitle>
      <div className="xs:flex-row flex flex-col items-center justify-center gap-2 rounded-lg border p-2 whitespace-nowrap">
        <div className="xs:w-fit xs:text-lg flex w-full flex-col gap-1 text-base">
          <div className={cn(boxVariants({ size: "small", color: "green" }))}>
            <CheckIcon className="xs:size-6 size-5" />
            <div>
              <span className="font-semibold">{correctHits}</span> correct
            </div>
          </div>
          <div className={cn(boxVariants({ size: "small", color: "red" }))}>
            <XIcon className="xs:size-6 size-5" />
            <div>
              <span className="font-semibold">{incorrectHits}</span> incorrect
            </div>
          </div>
          <div className={cn(boxVariants({ size: "small", color: "yellow" }))}>
            <TriangleAlert className="xs:size-6 size-5" />
            <div>
              <span className="font-semibold">{missedHits}</span> missed
            </div>
          </div>
        </div>

        <div className="xs:block hidden h-[calc(100%+1rem)] border-l"></div>
        <div className="xs:hidden block w-[calc(100%+1rem)] border-t"></div>

        <div className="xs:text-lg flex h-full w-full flex-col gap-1 text-base">
          <div
            className={cn(
              boxVariants({
                size: "big",
                color:
                  level > previousLevel
                    ? "green"
                    : level === previousLevel
                      ? "blue"
                      : "red",
              }),
            )}
          >
            <CrosshairIcon className="xs:size-6 size-5" />
            <div>
              <span className="font-semibold">{accuracy}%</span> accuracy
            </div>
          </div>
          {level > previousLevel && (
            <div
              className={cn(
                boxVariants({
                  size: "big",
                  color: "green",
                }),
              )}
            >
              <MoveUpRightIcon className="xs:size-6 size-5" />
              <div className="font-medium">Level Increased</div>
            </div>
          )}
          {level === previousLevel && (
            <div className={cn(boxVariants({ size: "big", color: "blue" }))}>
              <MoveRightIcon className="xs:size-6 size-5" />
              <div className="font-medium">Level Maintained</div>
            </div>
          )}
          {level < previousLevel && (
            <div className={cn(boxVariants({ size: "big", color: "red" }))}>
              <MoveDownRightIcon className="xs:size-6 size-5" />
              <div className="font-medium">Level Decreased</div>
            </div>
          )}
          <div className="xs:flex hidden items-center justify-between gap-3 text-center font-medium">
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
            <MoveRightIcon className="xs:size-6 size-5 flex-shrink-0" />
            <div
              className={cn(
                boxVariants({
                  size: "big",
                  color: "orange",
                  className: "w-full justify-center px-0",
                }),
              )}
            >
              Level {level}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
