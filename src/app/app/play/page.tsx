"use client";

import Game from "@/components/Game";
import SpaceBar from "@/components/SpaceBar";
import StartScreen from "../(components)/StartScreen";
import { useEffect, useRef, useState } from "react";
import sleep from "@/lib/sleep";
import {
  gameDelayBeforeStart,
  gameHiddenSquareDuration,
  gameVisibleSquareDuration,
} from "@/settings/constants";
import getUserLevel from "@/database/queries/games/getUserLevel";
import LevelDisplay from "../(components)/LevelDisplay";
import { useSidebar } from "@/context/SidebarContext";
import getHitStatistics from "@/lib/game-logic/getHitStatistics";
import calculateNewLevel from "@/lib/game-logic/calculateNewLevel";
import insertGameIntoDatabase from "@/lib/game-logic/insertGameIntoDatabase";
import generateGameSequence from "@/lib/game-logic/generateGameSequence";
import getCorrectHitSequence from "@/lib/game-logic/getCorrectHitSequence";

export default function PlayPage() {
  const [level, setLevel] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [correctHits, setCorrectHits] = useState<number | null>(null);
  const [incorrectHits, setIncorrectHits] = useState<number | null>(null);
  const [missedHits, setMissedHits] = useState<number | null>(null);

  const { setIsVisible } = useSidebar();

  const gameSequence = useRef<number[]>([]);
  const correctHitSequence = useRef<boolean[]>([]);
  const playerHitSequence = useRef<boolean[]>([]);
  const hasPressedSpaceBar = useRef(true);

  const updateGameData = async () => {
    const currentLevel = level as number;

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
    setLevel(newLevel);

    await insertGameIntoDatabase(
      correctHitSequence.current,
      playerHitSequence.current,
      currentLevel,
    );
  };

  const playGame = async () => {
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

      hasPressedSpaceBar.current = false;
      step++;
    }

    setIsPlaying(false);
    setIsVisible(true);

    await updateGameData();
  };

  const startPlaying = async () => {
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
  };

  useEffect(() => {
    const getLevel = async () => {
      const userLevel = await getUserLevel();
      setLevel(userLevel);
    };

    getLevel();
  }, []);

  return (
    <div className="-ml-16 flex h-screen items-center justify-center">
      <StartScreen
        visible={!isPlaying}
        onStart={startPlaying}
        correctHits={correctHits}
        incorrectHits={incorrectHits}
        missedHits={missedHits}
        newLevel={level}
      />
      <div className="flex h-full w-full max-w-3xl flex-col items-center">
        <div className="mb-[2.5cqmin] mt-[1.5cqmin] flex-shrink-0">
          <LevelDisplay level={level} />
        </div>
        <div className="h-full w-full">
          <Game selectedSquare={selectedSquare} />
        </div>
        <div className="mb-[2.5cqmin] mt-[3cqmin] h-[11cqmin] w-[90cqmin] flex-shrink-0">
          <SpaceBar hasPressedSpaceBar={hasPressedSpaceBar} />
        </div>
      </div>
    </div>
  );
}
