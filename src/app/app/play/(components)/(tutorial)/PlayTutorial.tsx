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
const level1ExplanationStep = 5;
const level1PlayStep = 6;

export default function PlayTutorial() {
  const [step, setStep] = useState(3);
  const [isRunning, setIsRunning] = useState(true);

  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [isSpaceBarPressed, setIsSpaceBarPressed] = useState(false);

  const stepRef = useRef(3);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    if (!isRunning) return;

    const boardStepAnimation = async () => {
      while (stepRef.current === boardStep) {
        setSelectedSquare(Math.floor(Math.random() * 8));
        await sleep(gameVisibleSquareDuration);
        setSelectedSquare(null);
        await sleep(gameHiddenSquareDuration);
      }
    };

    const buttonStepAnimation = async () => {
      while (stepRef.current === buttonStep) {
        setIsSpaceBarPressed(true);
        await sleep(400);
        setIsSpaceBarPressed(false);
        await sleep(2000);
      }
    };

    const level1ExplanationStepAnimation = async () => {
      while (stepRef.current === level1ExplanationStep) {
        setSelectedSquare(6);
        await sleep(gameVisibleSquareDuration);
        setSelectedSquare(null);
        await sleep(gameHiddenSquareDuration);
      }
    };

    if (stepRef.current === boardStep) {
      boardStepAnimation();
    } else if (stepRef.current === buttonStep) {
      buttonStepAnimation();
    } else if (stepRef.current === level1ExplanationStep) {
      level1ExplanationStepAnimation();
    } else if (stepRef.current === level1PlayStep) {
      setIsRunning(false);
      // playGame();
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
        isSpaceBarPressed={isSpaceBarPressed}
        handlePressSpaceBar={() => {}}
      />
    </>
  );
}
