"use client";

import { useCallback, useRef, useState } from "react";
import Game from "./Game";
import { useSidebar } from "@/context/SidebarContext";
import sleep from "@/lib/sleep";
import getHitStatistics from "@/lib/game-logic/getHitStatistics";
import calculateNewLevel from "@/lib/game-logic/calculateNewLevel";
import insertGameIntoDatabase from "@/lib/game-logic/insertGameIntoDatabase";
import {
  gameDelayBeforeStart,
  gameHiddenSquareDuration,
  gameVisibleSquareDuration,
} from "@/settings/constants";
import generateGameSequence from "@/lib/game-logic/generateGameSequence";
import getCorrectHitSequence from "@/lib/game-logic/getCorrectHitSequence";

interface GameLogicProps {
  startingLevel: number;
  showFeedbackEnabled: boolean;
}

export default function GameLogic({
  startingLevel,
  showFeedbackEnabled,
}: GameLogicProps) {
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
    <Game
      feedback={feedback}
      isStartScreenVisible={!isPlaying}
      startPlaying={startPlaying}
      correctHits={correctHits}
      incorrectHits={incorrectHits}
      missedHits={missedHits}
      previousLevel={previousLevel}
      level={level}
      selectedSquare={selectedSquare}
      hasPressedSpaceBarRef={hasPressedSpaceBar}
      handleShowFeedback={handleShowFeedback}
    />
  );
}
