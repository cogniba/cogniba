"use client";

import GameLevelDisplay from "./board/GameLevelDisplay";
import GameButton from "./board/GameButton";
import GameBoard from "./board/GameBoard";
import StartScreen from "./start-screen/GameStartScreen";

import { cn } from "@/lib/cn";
import { type Dispatch, type SetStateAction } from "react";
import GameNewLevelScreen from "./GameNewLevelScreen";
import GameConfetti from "./GameConfetti";

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
  hasReachedNewLevel: boolean;
  setHasReachedNewLevel: Dispatch<SetStateAction<boolean>>;
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
  hasReachedNewLevel,
  setHasReachedNewLevel,
}: GameProps) {
  const hasIncreasedLevel = level > previousLevel;

  return (
    <div
      className={cn(
        "flex h-full items-center justify-center transition duration-300",
        feedback === "correct" && "bg-green-200/80 dark:bg-green-950",
        feedback === "incorrect" && "bg-red-200/80 dark:bg-red-950",
        feedback === "missed" && "bg-yellow-200/50 dark:bg-yellow-950/70",
      )}
    >
      <GameConfetti hasIncreasedLevel={hasIncreasedLevel} />
      {hasReachedNewLevel && level < 5 ? (
        <GameNewLevelScreen
          level={level}
          setIsVisible={setHasReachedNewLevel}
        />
      ) : (
        <StartScreen
          visible={isStartScreenVisible}
          onStart={startPlaying}
          correctHits={correctHits}
          incorrectHits={incorrectHits}
          missedHits={missedHits}
          previousLevel={previousLevel}
          newLevel={level}
        />
      )}

      <div className="relative z-20 flex h-full w-full max-w-3xl flex-col items-center justify-center px-[4cqw] [container-type:size] md:px-2">
        <div className="my-[1.5cqh] flex-shrink-0 sm:mb-[2.5cqh] sm:mt-[1.5cqh]">
          <GameLevelDisplay level={level} />
        </div>
        <div className="h-[100cqmin] w-[100cqmin]">
          <GameBoard selectedSquare={selectedSquare} />
        </div>
        <div className="mb-[2.5cqh] mt-[3cqh] h-[11cqh] w-[100cqmin] max-w-5xl flex-shrink-0 2xl:w-[max(100cqmin,90vh)]">
          <GameButton
            isButtonPressed={isButtonPressed}
            handleButtonPress={handleButtonPress}
          />
        </div>
      </div>
    </div>
  );
}
