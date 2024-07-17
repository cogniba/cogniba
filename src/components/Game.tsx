"use client";

import sleep from "@/helpers/sleep";
import Crosshair from "./Crosshair";
import Square from "./Square";
import { useEffect, useRef, useState } from "react";

const baseSequenceLength = 20;
const numTargets = 6;

function getTargetsCount(sequence: number[], level: number) {
  let count = 0;

  for (let i = level; i < sequence.length; i++) {
    if (sequence[i] === sequence[i - level]) {
      count++;
    }
  }

  return count;
}

function generateGameSequence(level: number): number[] {
  const gameSequence = [];

  for (let i = 0; i < baseSequenceLength + level; i++) {
    gameSequence.push(Math.trunc(Math.random() * 8));
  }

  let targetsCount = getTargetsCount(gameSequence, level);

  while (targetsCount !== numTargets) {
    const randomIndex = Math.trunc(
      Math.random() * (gameSequence.length - level) + level,
    );

    if (
      targetsCount > numTargets &&
      gameSequence[randomIndex] === gameSequence[randomIndex - level]
    ) {
      gameSequence[randomIndex] = Math.trunc(Math.random() * 8);
    } else if (
      targetsCount < numTargets &&
      gameSequence[randomIndex] !== gameSequence[randomIndex - level]
    ) {
      gameSequence[randomIndex] = gameSequence[randomIndex - level];
    }

    targetsCount = getTargetsCount(gameSequence, level);
  }

  return gameSequence;
}

export default function Game() {
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const gameSequence = useRef<number[]>([]);

  useEffect(() => {
    gameSequence.current = generateGameSequence(1);
    console.log(gameSequence.current);

    // gameSequence.current.forEach(async (position) => {
    //   console.log(position);
    //   setSelectedSquare(position);
    //   await sleep(700);
    //   setSelectedSquare(null);
    //   await sleep(2300);
    // });

    async function playGame() {
      for (const position of gameSequence.current) {
        console.log(position);
        setSelectedSquare(position);
        await sleep(700);
        setSelectedSquare(null);
        await sleep(2300);
      }
    }

    playGame();
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center p-10 [container-type:size]">
      <div className="grid h-[100cqmin] w-[100cqmin] grid-cols-3 grid-rows-3 gap-2 bg-black">
        {Array.from({ length: 9 }, (_, i) =>
          i == 4 ? (
            <Crosshair key={i} />
          ) : (
            <Square key={i} selected={i - Number(i > 4) === selectedSquare} />
          ),
        )}
      </div>
    </div>
  );
}
