"use client";

import Game from "../Game";
import PlayTutorialSteps from "./PlayTutorialSteps";
import sleep from "@/lib/sleep";
import finishTutorial from "@/server-actions/finishTutorial";

import { useEffect, useRef, useState } from "react";
import {
  gameDelayBeforeStart,
  gameHiddenSquareDuration,
  gameVisibleSquareDuration,
} from "@/settings/constants";
import { useSession } from "next-auth/react";
import useGameLogic from "@/hooks/useGameLogic";

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
  const [isVisible, setIsVisible] = useState(true);
  const [tutorialSelectedSquare, setTutorialSelectedSquare] = useState<
    number | null
  >(null);
  const [isTutorialButtonPressed, setIsTutorialButtonPressed] = useState(false);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
  const [isLoadingGame, setIsLoadingGame] = useState(false);

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
    setShowTutorialHint: setIsVisible,
  });

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    if (!isVisible) return;

    const boardStepAnimation = async () => {
      while (stepRef.current === boardStep) {
        setTutorialSelectedSquare(Math.floor(Math.random() * 8));
        await sleep(gameVisibleSquareDuration);
        setTutorialSelectedSquare(null);
        await sleep(gameHiddenSquareDuration);
      }
      setIsPlayingAnimation(false);
    };

    const buttonStepAnimation = async () => {
      while (stepRef.current === buttonStep) {
        setIsTutorialButtonPressed(true);
        await sleep(400);
        setIsTutorialButtonPressed(false);
        await sleep(2000);
      }
      setIsPlayingAnimation(false);
    };

    const level1ExplanationAnimation = async () => {
      while (stepRef.current === level1ExplanationStep) {
        setTutorialSelectedSquare(6);
        await sleep(gameVisibleSquareDuration);
        setTutorialSelectedSquare(null);
        await sleep(gameHiddenSquareDuration);
      }

      setIsPlayingAnimation(false);
    };

    const startTutorialGame = async () => {
      setIsVisible(false);
      await startPlaying();
      setStep((step) => step + 1);
      setIsVisible(true);
    };

    const handleStartGameDelay = async () => {
      setIsLoadingGame(true);
      await sleep(gameDelayBeforeStart);
      setIsLoadingGame(false);
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
      setIsPlayingAnimation(false);
    };

    const handleLastStep = async () => {
      await updateSession({ hasFinishedTutorial: true });
      await finishTutorial();
    };

    if (stepRef.current === boardStep) {
      if (!isPlayingAnimation) {
        setIsPlayingAnimation(true);
        boardStepAnimation();
      }
    } else if (stepRef.current === buttonStep) {
      if (!isPlayingAnimation) {
        setIsPlayingAnimation(true);
        buttonStepAnimation();
      }
    } else if (stepRef.current === level1ExplanationStep) {
      if (!isPlayingAnimation) {
        setIsPlayingAnimation(true);
        level1ExplanationAnimation();
      }
    } else if (stepRef.current === level1PlayStep) {
      if (!isPlaying) {
        handleStartGameDelay();
        startTutorialGame();
      }
    } else if (stepRef.current === level2ExplanationStep) {
      if (!isPlayingAnimation) {
        setIsPlayingAnimation(true);
        level2ExplanationAnimation();
      }
    } else if (stepRef.current === lastStep) {
      stepRef.current++;
      handleLastStep();
    }
  }, [
    isVisible,
    step,
    startPlaying,
    isPlaying,
    updateSession,
    isPlayingAnimation,
  ]);

  return (
    <>
      <PlayTutorialSteps
        step={step - Number(isLoadingGame)}
        setStep={setStep}
        isVisible={isVisible}
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
        selectedSquare={
          tutorialSelectedSquare !== null
            ? tutorialSelectedSquare
            : selectedSquare
        }
        isButtonPressed={isButtonPressed || isTutorialButtonPressed}
        handleButtonPress={handleButtonPress}
      />
    </>
  );
}
