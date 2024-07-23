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

  useEffect(() => {
    if (!level) return;

    gameSequence.current = generateGameSequence(level);
    correctHitSequence.current = getCorrectHitSequence(
      gameSequence.current,
      level,
    );
  }, [level]);

  return (
    <div className="flex h-full items-center justify-center bg-red-500">
      <StartScreen visible={!isPlaying} onStart={startPlaying} />
      <div className="flex h-full w-[50rem] flex-col items-center bg-blue-500">
        <div className="h-full w-full bg-pink-500">
          <Game selectedSquare={selectedSquare} />
        </div>
        <div className="h-44 w-full flex-shrink-0">
          <SpaceBar hasPressedSpaceBar={hasPressedSpaceBar} />
        </div>
      </div>
    </div>
  );
}
