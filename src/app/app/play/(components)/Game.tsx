"use client";

import LevelDisplay from "./LevelDisplay";
import GameButton from "./GameButton";
import Board from "./Board";
import { cn } from "@/lib/cn";
import StartScreen from "./StartScreen";

interface GameProps {
  feedback: "correct" | "incorrect" | "missed" | null;
  isStartScreenVisible: boolean;
  startPlaying: () => void;
  correctHits: number | null;
  incorrectHits: number | null;
  missedHits: number | null;
  previousLevel: number;
  level: number;
  selectedSquare: number | null;
  isButtonPressed: boolean;
  handleButtonPress: () => void;
}

export default function Game({
  feedback,
  isStartScreenVisible,
  startPlaying,
  correctHits,
  incorrectHits,
  missedHits,
  previousLevel,
  level,
  selectedSquare,
  isButtonPressed,
  handleButtonPress,
}: GameProps) {
  return (
    <>
      <div
        className={cn(
          "flex h-screen items-center justify-center transition duration-300 lg:can-hover:-ml-16",
          feedback === "correct" && "bg-green-200/80 dark:bg-green-950",
          feedback === "incorrect" && "bg-red-200/80 dark:bg-red-950",
          feedback === "missed" && "bg-yellow-200/50 dark:bg-yellow-950/70",
        )}
      >
        <StartScreen
          visible={isStartScreenVisible}
          onStart={startPlaying}
          correctHits={correctHits}
          incorrectHits={incorrectHits}
          missedHits={missedHits}
          previousLevel={previousLevel}
          newLevel={level}
        />
        <div className="flex h-full w-full max-w-3xl flex-col items-center justify-center px-[4cqw] [container-type:size] md:px-2">
          <div className="my-first-step my-[1.5cqh] flex-shrink-0 sm:mb-[2.5cqh] sm:mt-[1.5cqh]">
            <LevelDisplay level={level} />
          </div>
          <div className="h-[100cqmin] w-[100cqmin]">
            <Board selectedSquare={selectedSquare} />
          </div>
          <div className="mb-[2.5cqh] mt-[3cqh] h-[11cqh] w-[100cqmin] max-w-5xl flex-shrink-0 2xl:w-[max(100cqmin,90vh)]">
            <GameButton
              isButtonPressed={isButtonPressed}
              handleButtonPress={handleButtonPress}
            />
          </div>
        </div>
      </div>
    </>
  );
}
