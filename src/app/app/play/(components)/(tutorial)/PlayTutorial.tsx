"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Game from "../Game";
import PlayTutorialSteps from "./PlayTutorialSteps";
import sleep from "@/lib/sleep";
import {
  gameHiddenSquareDuration,
  gameVisibleSquareDuration,
} from "@/settings/constants";

const boardStep = 3;
const buttonStep = 4;

export default function PlayTutorial() {
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const stepRef = useRef(0);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    if (!isRunning) return;

    const blinkSquares = async () => {
      while (stepRef.current === boardStep) {
        setSelectedSquare(Math.floor(Math.random() * 8));
        await sleep(gameVisibleSquareDuration);
        setSelectedSquare(null);
        await sleep(gameHiddenSquareDuration);
      }
    };

    if (stepRef.current === boardStep) {
      blinkSquares();
    }
  }, [isRunning, step]);

  return (
    <>
      <PlayTutorialSteps
        step={step}
        setStep={setStep}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      />
      <Game
        feedback={null}
        isStartScreenVisible={false}
        startPlaying={() => {}}
        correctHits={null}
        incorrectHits={null}
        missedHits={null}
        previousLevel={1}
        level={1}
        selectedSquare={selectedSquare}
        isSpaceBarPressed={true}
        handlePressSpaceBar={() => {}}
      />
    </>
  );
}
