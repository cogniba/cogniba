"use client";

import { useEffect } from "react";
import GameTutorialSteps from "./tutorial/GameTutorialSteps";
import { useGameContext } from "@/context/GameContext";
import { useGameTutorialContext } from "@/context/GameTutorialContext";
import sleep from "@/lib/sleep";

export default function GameNewLevelScreen() {
  const { setHasReachedNewLevel } = useGameContext();
  const { step, setStep, steps } = useGameTutorialContext();

  useEffect(() => {
    const handleHideScreen = async () => {
      await sleep(500);
      setHasReachedNewLevel(false);
      setStep(0);
    };

    if (step === steps.length) {
      handleHideScreen();
    }
  }, [step, setHasReachedNewLevel, steps.length, setStep]);

  return <GameTutorialSteps showSkipButton={false} />;
}
