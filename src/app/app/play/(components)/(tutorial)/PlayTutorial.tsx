"use client";

import { useEffect, useRef, useState } from "react";
import Game from "../Game";
import PlayTutorialSteps from "./PlayTutorialSteps";
import sleep from "@/lib/sleep";
import {
  gameHiddenSquareDuration,
  gameVisibleSquareDuration,
} from "@/settings/constants";
import useGameLogic from "@/hooks/useGameLogic";
import finishTutorial from "@/server-actions/finishTutorial";
import { useSession } from "next-auth/react";

const boardStep = 3;
const buttonStep = 4;
const level1ExplanationStep = 5;
const level1PlayStep = 7;
const level1BeatStep = 8;
const level2ExplanationStep = 9;
const lastStep = 11;

interface PlayTutorialProps {
  startingLevel: number;
  showSkipButton: boolean;
}

export default function PlayTutorial({
  startingLevel,
  showSkipButton,
}: PlayTutorialProps) {
  const [step, setStep] = useState(startingLevel === 1 ? 0 : level1BeatStep);
  const [isRunning, setIsRunning] = useState(true);

  const [tutorialSelectedSquare, setTutorialSelectedSquare] = useState<
    number | null
  >(null);
  const [isTutorialButtonPressed, setIsTutorialButtonPressed] = useState(false);

  const stepRef = useRef(startingLevel === 1 ? 0 : level1BeatStep);

  const { update: updateSession } = useSession();

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
    isButtonPressed,
    handleButtonPress,
  } = useGameLogic({
    startingLevel,
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
        setIsTutorialButtonPressed(true);
        await sleep(400);
        setIsTutorialButtonPressed(false);
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

    const level2ExplanationAnimation = async () => {
      let square = 5;

      while (stepRef.current === level2ExplanationStep) {
        setTutorialSelectedSquare(square);
        await sleep(gameVisibleSquareDuration);
        setTutorialSelectedSquare(null);
        await sleep(gameHiddenSquareDuration);
        square = square === 5 ? 6 : 5;
      }
    };

    const handleLastStep = async () => {
      await updateSession({ hasFinishedTutorial: true });
      await finishTutorial();
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
    } else if (stepRef.current === level2ExplanationStep) {
      level2ExplanationAnimation();
    } else if (stepRef.current === lastStep) {
      stepRef.current++;
      handleLastStep();
    }
  }, [isRunning, step, startPlaying, isPlaying, updateSession]);

  return (
    <>
      <PlayTutorialSteps
        step={step}
        setStep={setStep}
        isRunning={isRunning}
        showSkipButton={showSkipButton}
      />
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
        isButtonPressed={isButtonPressed || isTutorialButtonPressed}
        handleButtonPress={handleButtonPress}
      />
    </>
  );
}
