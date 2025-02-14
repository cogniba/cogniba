"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useGameContext } from "./GameContext";
import { useSidebar } from "@/components/ui/sidebar";
import sleep from "@/lib/sleep";
import gameConfig from "@/config/gameConfig";
import gameTutorialConfig, { StepType } from "@/config/gameTutorialConfig";
import updateProfile from "@/actions/updateProfile";
import redirectToError from "@/actions/redirectToError";
import { usePostHog } from "posthog-js/react";

interface GameTutorialContextValue {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isVisible: boolean;
  isLoading: boolean;
  handleFinishTutorial: () => Promise<void>;
  steps: readonly StepType[];
}

export const GameTutorialContext = createContext<GameTutorialContextValue>({
  step: 0,
  setStep: () => {},
  isVisible: false,
  isLoading: false,
  handleFinishTutorial: async () => {},
  steps: [],
});

interface GameTutorialContextProviderProps {
  children: React.ReactNode;
}

export default function GameTutorialContextProvider({
  children,
}: GameTutorialContextProviderProps) {
  const posthog = usePostHog();
  const { parameters } = gameConfig;
  const {
    level,
    startPlaying,
    isPlaying,
    setSelectedSquare,
    setIsButtonPressed,
    showTutorial: isVisible,
    isTutorial,
    setIsTutorial,
    setShowTutorial,
  } = useGameContext();
  const { tutorialSteps, getNewLevelSteps, stepsInfo } = gameTutorialConfig;

  const [step, setStep] = useState(level === 1 ? 0 : stepsInfo.level1BeatStep);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
  const [isLoadingGame, setIsLoadingGame] = useState(false);

  const stepRef = useRef(level === 1 ? 0 : stepsInfo.level1BeatStep);

  const [isPending, startTransition] = useTransition();

  const { setOpen } = useSidebar();

  const handleFinishTutorial = useCallback(async () => {
    startTransition(async () => {
      const { error } = await updateProfile({ hasFinishedTutorial: true });

      if (error) {
        redirectToError(error);
      } else {
        setIsTutorial(false);
        setShowTutorial(true);
        setStep(0);
        setOpen(true);
      }
    });
  }, [setIsTutorial, setOpen, setShowTutorial]);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    if (!isVisible) return;

    const boardStepAnimation = async () => {
      while (stepRef.current === stepsInfo.boardStep) {
        setSelectedSquare(Math.floor(Math.random() * 8));
        await sleep(parameters.visibleSquareDuration);
        setSelectedSquare(null);
        await sleep(parameters.hiddenSquareDuration);
      }
      setIsPlayingAnimation(false);
    };

    const buttonStepAnimation = async () => {
      while (stepRef.current === stepsInfo.buttonStep) {
        setIsButtonPressed(true);
        await sleep(400);
        setIsButtonPressed(false);
        await sleep(2000);
      }
      setIsPlayingAnimation(false);
    };
    const level1ExplanationAnimation = async () => {
      while (stepRef.current === stepsInfo.level1ExplanationStep) {
        setSelectedSquare(6);
        await sleep(parameters.visibleSquareDuration);
        setSelectedSquare(null);
        await sleep(parameters.hiddenSquareDuration);
      }

      setIsPlayingAnimation(false);
    };

    const startTutorialGame = async () => {
      setShowTutorial(false);
      await startPlaying();
      setStep((step) => step + 1);
      await sleep(500);
      setShowTutorial(true);
    };

    const handleStartGameDelay = async () => {
      setIsLoadingGame(true);
      await sleep(parameters.delayBeforeStart);
      setIsLoadingGame(false);
    };

    const level2ExplanationAnimation = async () => {
      let square = 5;

      while (stepRef.current === stepsInfo.level2ExplanationStep) {
        setSelectedSquare(square);
        await sleep(parameters.visibleSquareDuration);
        setSelectedSquare(null);
        await sleep(parameters.hiddenSquareDuration);
        square = square === 5 ? 6 : 5;
      }
      setIsPlayingAnimation(false);
    };

    const handleLastStep = async () => {
      posthog.capture("tutorial_complete", {
        has_skipped: false,
      });
      await handleFinishTutorial();
    };

    if (stepRef.current === stepsInfo.boardStep) {
      if (!isPlayingAnimation) {
        setIsPlayingAnimation(true);
        boardStepAnimation();
      }
    } else if (stepRef.current === stepsInfo.buttonStep) {
      if (!isPlayingAnimation) {
        setIsPlayingAnimation(true);
        buttonStepAnimation();
      }
    } else if (stepRef.current === stepsInfo.level1ExplanationStep) {
      if (!isPlayingAnimation) {
        setIsPlayingAnimation(true);
        level1ExplanationAnimation();
      }
    } else if (stepRef.current === stepsInfo.level1PlayStep) {
      if (!isPlaying) {
        handleStartGameDelay();
        startTutorialGame();
      }
    } else if (stepRef.current === stepsInfo.level2ExplanationStep) {
      if (!isPlayingAnimation) {
        setIsPlayingAnimation(true);
        level2ExplanationAnimation();
      }
    } else if (stepRef.current === stepsInfo.lastStep) {
      handleLastStep();
    }
  }, [
    isVisible,
    step,
    startPlaying,
    isPlaying,
    isPlayingAnimation,
    setOpen,
    setSelectedSquare,
    setIsButtonPressed,
    setIsTutorial,
    setShowTutorial,
    handleFinishTutorial,
    stepsInfo.boardStep,
    stepsInfo.buttonStep,
    stepsInfo.level1ExplanationStep,
    stepsInfo.level1PlayStep,
    stepsInfo.level2ExplanationStep,
    stepsInfo.lastStep,
    parameters.visibleSquareDuration,
    parameters.hiddenSquareDuration,
    parameters.delayBeforeStart,
    posthog,
  ]);

  return (
    <GameTutorialContext.Provider
      value={{
        step: step - Number(isLoadingGame),
        setStep,
        isVisible,
        isLoading: isPending,
        handleFinishTutorial,
        steps: isTutorial ? tutorialSteps : getNewLevelSteps(level),
      }}
    >
      {children}
    </GameTutorialContext.Provider>
  );
}

export function useGameTutorialContext() {
  return useContext(GameTutorialContext);
}
