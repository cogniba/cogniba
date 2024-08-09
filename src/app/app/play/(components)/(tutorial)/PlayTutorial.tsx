"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Game from "../Game";
import PlayTutorialSteps from "./PlayTutorialSteps";
import sleep from "@/lib/sleep";
import {
  gameHiddenSquareDuration,
  gameVisibleSquareDuration,
} from "@/settings/constants";
import useGameLogic from "@/hooks/useGameLogic";

const boardStep = 3;
const buttonStep = 4;
const level1ExplanationStep = 5;
const level1PlayStep = 7;

export default function PlayTutorial() {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const [tutorialSelectedSquare, setTutorialSelectedSquare] = useState<
    number | null
  >(null);
  const [tutorialSpaceBarPressed, setTutorialSpaceBarPressed] = useState(false);

  const stepRef = useRef(0);

  const {
    feedback,
    isPlaying,
    startPlaying,
    correctHits,
    incorrectHits,
    missedHits,
    previousLevel,
    level,
    selectedSquare,
    isSpaceBarPressed,
    handleSpaceBarPress,
  } = useGameLogic({
    startingLevel: 1,
    showFeedbackEnabled: true,
    isTutorial: true,
    setShowTutorialHint: setIsRunning,
  });

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    if (!isRunning) return;

    const boardStepAnimation = async () => {
      while (stepRef.current === boardStep) {
        setTutorialSelectedSquare(Math.floor(Math.random() * 8));
        await sleep(gameVisibleSquareDuration);
        setTutorialSelectedSquare(null);
        await sleep(gameHiddenSquareDuration);
      }
    };

    const buttonStepAnimation = async () => {
      while (stepRef.current === buttonStep) {
        setTutorialSpaceBarPressed(true);
        await sleep(400);
        setTutorialSpaceBarPressed(false);
        await sleep(2000);
      }
    };

    const level1ExplanationAnimation = async () => {
      while (stepRef.current === level1ExplanationStep) {
        setTutorialSelectedSquare(6);
        await sleep(gameVisibleSquareDuration);
        setTutorialSelectedSquare(null);
        await sleep(gameHiddenSquareDuration);
      }
    };

    const startTutorialGame = async () => {
      setIsRunning(false);
      await startPlaying();
      setStep((step) => step + 1);
      setIsRunning(true);
    };

    if (stepRef.current === boardStep) {
      boardStepAnimation();
    } else if (stepRef.current === buttonStep) {
      buttonStepAnimation();
    } else if (stepRef.current === level1ExplanationStep) {
      level1ExplanationAnimation();
    } else if (stepRef.current === level1PlayStep) {
      if (!isPlaying) {
        startTutorialGame();
      }
    }
  }, [isRunning, step, startPlaying, isPlaying]);

  return (
    <>
      <PlayTutorialSteps step={step} setStep={setStep} isRunning={isRunning} />
      <Game
        feedback={feedback}
        isStartScreenVisible={false}
        startPlaying={startPlaying}
        correctHits={correctHits}
        incorrectHits={incorrectHits}
        missedHits={missedHits}
        previousLevel={previousLevel}
        level={level}
        selectedSquare={selectedSquare || tutorialSelectedSquare}
        isSpaceBarPressed={isSpaceBarPressed || tutorialSpaceBarPressed}
        handlePressSpaceBar={handleSpaceBarPress}
      />
    </>
  );
}
