"use client";

import { useEffect } from "react";
import GameTutorialSteps from "./tutorial/GameTutorialSteps";
import { Strong } from "@/components/ui/Strong";
import sleep from "@/lib/sleep";
import { useGameContext } from "@/context/GameContext";
import { StepType } from "@/config/gameTutorial";
import { useGameTutorialContext } from "@/context/GameTutorialContext";

function getSteps(level: number) {
  return [
    {
      title: (
        <>
          You reached <Strong variant="primary"> level {level}</Strong>!
        </>
      ),
      content: (
        <>
          <Strong>Congratulations</Strong> on reaching{" "}
          <Strong variant="primary">level {level}</Strong>, you are{" "}
          <Strong>doing great!</Strong>
        </>
      ),
      placement: "center",
      target: "body",
      hideBackButton: true,
    },
    {
      title: (
        <>
          How to play <Strong variant="primary">level {level}</Strong>
        </>
      ),
      content: (
        <>
          You are now on <Strong variant="primary">level {level}</Strong>, so
          you will have to <Strong>press the button</Strong> when the square
          appears <Strong>in the same spot as</Strong>{" "}
          <Strong variant="primary">{level} steps</Strong>{" "}
          <Strong>before</Strong>.
        </>
      ),
      placement: "center",
      target: "body",
      hideBackButton: true,
      primaryButtonText: "Okay",
    },
  ] satisfies StepType[];
}

export default function GameNewLevelScreen() {
  const { level, setHasReachedNewLevel } = useGameContext();
  const { step } = useGameTutorialContext();

  const steps = getSteps(level);

  useEffect(() => {
    const handleHideScreen = async () => {
      await sleep(500);
      setHasReachedNewLevel(false);
    };

    if (step === steps.length) {
      handleHideScreen();
    }
  }, [step, setHasReachedNewLevel, steps.length]);

  return <GameTutorialSteps showSkipButton={false} />;
}
