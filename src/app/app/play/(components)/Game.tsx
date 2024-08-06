"use client";

import { useSidebar } from "@/context/SidebarContext";
import { useCallback, useRef, useState } from "react";
import StartScreen from "./StartScreen";
import LevelDisplay from "./LevelDisplay";
import SpaceBar from "./SpaceBar";
import GameMain from "./GameMain";
import generateGameSequence from "@/lib/game-logic/generateGameSequence";
import getCorrectHitSequence from "@/lib/game-logic/getCorrectHitSequence";
import sleep from "@/lib/sleep";
import {
  gameDelayBeforeStart,
  gameHiddenSquareDuration,
  gameVisibleSquareDuration,
} from "@/settings/constants";
import getHitStatistics from "@/lib/game-logic/getHitStatistics";
import calculateNewLevel from "@/lib/game-logic/calculateNewLevel";
import insertGameIntoDatabase from "@/lib/game-logic/insertGameIntoDatabase";
import { cn } from "@/lib/cn";

interface GameProps {
  startingLevel: number;
  showFeedbackEnabled: boolean;
}

export default function Game({
  startingLevel,
  showFeedbackEnabled,
}: GameProps) {
  const [level, setLevel] = useState<number>(startingLevel);
  const [previousLevel, setPreviousLevel] = useState<number>(startingLevel);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [correctHits, setCorrectHits] = useState<number | null>(null);
  const [incorrectHits, setIncorrectHits] = useState<number | null>(null);
  const [missedHits, setMissedHits] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<
    "correct" | "incorrect" | "missed" | null
  >(null);

  const { setIsVisible } = useSidebar();

  const gameSequence = useRef<number[]>([]);
  const correctHitSequence = useRef<boolean[]>([]);
  const playerHitSequence = useRef<boolean[]>([]);
  const hasPressedSpaceBar = useRef(true);

  const showFeedback = useCallback(
    async (feedback: "correct" | "incorrect" | "missed") => {
      if (!showFeedbackEnabled) return;
      setFeedback(feedback);
      if (feedback === "missed") {
        await sleep(200);
      } else {
        await sleep(400);
      }
      setFeedback(null);
    },
    [showFeedbackEnabled],
  );

  const handleShowFeedback = useCallback(async () => {
    if (correctHitSequence.current[playerHitSequence.current.length]) {
      await showFeedback("correct");
    } else {
      await showFeedback("incorrect");
    }
  }, [showFeedback]);

  const updateGameData = useCallback(async () => {
    const currentLevel = level;

    const { correctHits, incorrectHits, missedHits } = getHitStatistics(
      correctHitSequence.current,
      playerHitSequence.current,
    );
    setCorrectHits(correctHits);
    setIncorrectHits(incorrectHits);
    setMissedHits(missedHits);

    const newLevel = calculateNewLevel(
      correctHitSequence.current,
      playerHitSequence.current,
      currentLevel,
    );
    setPreviousLevel(currentLevel);
    setLevel(newLevel);

    await insertGameIntoDatabase(
      correctHitSequence.current,
      playerHitSequence.current,
      currentLevel,
    );
  }, [level]);

  const playGame = useCallback(async () => {
    let step = 0;

    hasPressedSpaceBar.current = false;
    for (const position of gameSequence.current) {
      setSelectedSquare(position);
      await sleep(gameVisibleSquareDuration);
      setSelectedSquare(null);
      await sleep(gameHiddenSquareDuration);

      if (hasPressedSpaceBar.current) {
        playerHitSequence.current.push(true);
      } else {
        playerHitSequence.current.push(false);
      }

      if (correctHitSequence.current[step] && !hasPressedSpaceBar.current) {
        showFeedback("missed");
      }

      hasPressedSpaceBar.current = false;
      step++;
    }

    setIsPlaying(false);
    setIsVisible(true);

    await updateGameData();
  }, [setIsVisible, showFeedback, updateGameData]);

  const startPlaying = useCallback(async () => {
    if (!level) return;

    setIsPlaying(true);
    setIsVisible(false);

    gameSequence.current = generateGameSequence(level);
    correctHitSequence.current = getCorrectHitSequence(
      gameSequence.current,
      level,
    );
    playerHitSequence.current = [];

    await sleep(gameDelayBeforeStart);
    playGame();
  }, [level, playGame, setIsVisible]);

  return (
    <div
      className={cn(
        "flex h-screen items-center justify-center transition duration-300 lg:can-hover:-ml-16",
        feedback === "correct" && "bg-green-200/80 dark:bg-green-950",
        feedback === "incorrect" && "bg-red-200/80 dark:bg-red-950",
        feedback === "missed" && "bg-yellow-200/50 dark:bg-yellow-950/70",
      )}
    >
      <StartScreen
        visible={!isPlaying}
        onStart={startPlaying}
        correctHits={correctHits}
        incorrectHits={incorrectHits}
        missedHits={missedHits}
        previousLevel={previousLevel}
        newLevel={level}
      />
      <div className="flex h-full w-full max-w-3xl flex-col items-center justify-center px-[4cqw] [container-type:size] md:px-2">
        <div className="my-[1.5cqh] flex-shrink-0 sm:mb-[2.5cqh] sm:mt-[1.5cqh]">
          <LevelDisplay level={level} />
        </div>
        <div className="h-[100cqmin] w-[100cqmin]">
          <GameMain selectedSquare={selectedSquare} />
        </div>
        <div className="mb-[2.5cqh] mt-[3cqh] h-[11cqh] w-[100cqmin] max-w-5xl flex-shrink-0 2xl:w-[max(100cqmin,90vh)]">
          <SpaceBar
            hasPressedSpaceBar={hasPressedSpaceBar}
            handleShowFeedback={handleShowFeedback}
          />
        </div>
      </div>
    </div>
  );
}
