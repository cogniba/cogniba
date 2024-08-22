"use client";

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import GameTutorialSteps, {
  type StepType,
} from "./(tutorial)/GameTutorialSteps";
import { Strong } from "@/components/ui/Strong";
import sleep from "@/lib/sleep";

function getSteps(level: number) {
  return [
    {
      title: (
        <>
          You reached <Strong variant="orange"> level {level}</Strong>!
        </>
      ),
      content: (
        <>
          <Strong>Congratulations</Strong> on reaching{" "}
          <Strong variant="orange">level {level}</Strong>, you are{" "}
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
          How to play <Strong variant="orange">level {level}</Strong>
        </>
      ),
      content: (
        <>
          You are now on <Strong variant="orange">level {level}</Strong>, so you
          will have to <Strong>press the button</Strong> when the square appears{" "}
          <Strong>in the same spot as</Strong>{" "}
          <Strong variant="orange">{level} steps</Strong>{" "}
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

interface GameNewLevelScreenProps {
  level: number;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export default function GameNewLevelScreen({
  level,
  setIsVisible,
}: GameNewLevelScreenProps) {
  const [step, setStep] = useState(0);

  const steps = getSteps(level);

  useEffect(() => {
    const handleHideScreen = async () => {
      await sleep(500);
      setIsVisible(false);
    };

    if (step === steps.length) {
      handleHideScreen();
    }
  }, [step, setIsVisible, steps.length]);

  return (
    <GameTutorialSteps
      isVisible={true}
      setStep={setStep}
      showSkipButton={false}
      step={step}
      steps={steps}
    />
  );
}
