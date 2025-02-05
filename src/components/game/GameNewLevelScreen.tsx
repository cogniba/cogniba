"use client";

import { useEffect } from "react";
import GameTutorialSteps from "./tutorial/GameTutorialSteps";
import sleep from "@/lib/sleep";
import { useGameContext } from "@/context/GameContext";
import { useGameTutorialContext } from "@/context/GameTutorialContext";

export default function GameNewLevelScreen() {
  const { setHasReachedNewLevel } = useGameContext();
  const { step, steps } = useGameTutorialContext();

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
