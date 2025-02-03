"use client";

import GameLevelDisplay from "./board/GameLevelDisplay";
import GameButton from "./board/GameButton";
import GameBoard from "./board/GameBoard";
import GameStartScreen from "./start-screen/GameStartScreen";

import { cn } from "@/lib/cn";
import GameNewLevelScreen from "./GameNewLevelScreen";
import GameConfetti from "./GameConfetti";
import { useGameContext } from "@/context/GameContext";

export default function Game() {
  const {
    level,
    previousLevel,
    feedback,
    hasReachedNewLevel,
    selectedSquare,
    isButtonPressed,
    handleButtonPress,
  } = useGameContext();

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
        <GameNewLevelScreen />
      ) : (
        <GameStartScreen />
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
