"use client";

import Game from "@/components/Game";
import SpaceBar from "@/components/SpaceBar";
import StartScreen from "../(components)/StartScreen";
import { useEffect, useRef, useState } from "react";
import {
  calculateNewLevel,
  generateGameSequence,
  getCorrectHitSequence,
  insertGameIntoDatabase,
} from "@/utils/gameLogic";
import sleep from "@/utils/sleep";
import {
  gameDelayBeforeStart,
  gameHiddenSquareDuration,
  gameVisibleSquareDuration,
} from "@/settings/constants";
import getUserLevel from "@/database/queries/getUserLevel";
import LevelDisplay from "../(components)/LevelDisplay";

export default function PlayPage() {
  const [level, setLevel] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);

  const gameSequence = useRef<number[]>([]);
  const correctHitSequence = useRef<boolean[]>([]);
  const playerHitSequence = useRef<boolean[]>([]);
  const hasPressedSpaceBar = useRef(true);

  let step = 0;

  const playGame = async () => {
    step = 0;

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

    const currentLevel = level as number;

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

  const startPlaying = async () => {
    if (!level) return;

    setIsPlaying(true);

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
    <div className="flex h-full items-center justify-center">
      <StartScreen visible={!isPlaying} onStart={startPlaying} />
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
