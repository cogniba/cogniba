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
import { useToast } from "@/hooks/use-toast";
import sleep from "@/lib/sleep";
import {
  DELAY_BEFORE_START,
  HIDDEN_SQUARE_DURATION,
  VISIBLE_SQUARE_DURATION,
} from "@/config/game";
import gameTutorialConfig, { StepType } from "@/config/gameTutorial";

interface GameTutorialContextValue {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isVisible: boolean;
  isLoading: boolean;
  handleFinishTutorial: () => Promise<void>;
  steps: StepType[];
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
  const {
    isLoading,
    level,
    startPlaying,
    isPlaying,
    setSelectedSquare,
    setIsButtonPressed,
    showTutorial: isVisible,
    setShowTutorial: setIsVisible,
    isTutorial,
    setIsTutorial,
    setShowTutorial,
  } = useGameContext();
  const { tutorialSteps, getNewLevelSteps, stepsInfo } = gameTutorialConfig;

  const [step, setStep] = useState(-1);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
  const [isLoadingGame, setIsLoadingGame] = useState(false);

  const stepRef = useRef(-1);

  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();
  const { setOpen } = useSidebar();

  const handleFinishTutorial = useCallback(async () => {
    startTransition(async () => {
      const response = await fetch("/api/user/update-user", {
        method: "POST",
        body: JSON.stringify({ hasFinishedTutorial: true }),
      });

      if (!response.ok) {
        toast({ title: "Unexpected error occurred", variant: "destructive" });
      } else {
        setIsTutorial(false);
        setShowTutorial(false);
      }
    });
  }, [toast, setIsTutorial, setShowTutorial]);

  useEffect(() => {
    if (isLoading || step !== -1) return;

    setStep(level === 1 ? 0 : stepsInfo.level1BeatStep);
    stepRef.current = level === 1 ? 0 : stepsInfo.level1BeatStep;
  }, [isLoading, level, step, stepsInfo.level1BeatStep]);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    if (!isVisible) return;

    const boardStepAnimation = async () => {
      while (stepRef.current === stepsInfo.boardStep) {
        setSelectedSquare(Math.floor(Math.random() * 8));
        await sleep(VISIBLE_SQUARE_DURATION);
        setSelectedSquare(null);
        await sleep(HIDDEN_SQUARE_DURATION);
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
        await sleep(VISIBLE_SQUARE_DURATION);
        setSelectedSquare(null);
        await sleep(HIDDEN_SQUARE_DURATION);
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
      await sleep(DELAY_BEFORE_START);
      setIsLoadingGame(false);
    };

    const level2ExplanationAnimation = async () => {
      let square = 5;

      while (stepRef.current === stepsInfo.level2ExplanationStep) {
        setSelectedSquare(square);
        await sleep(VISIBLE_SQUARE_DURATION);
        setSelectedSquare(null);
        await sleep(HIDDEN_SQUARE_DURATION);
        square = square === 5 ? 6 : 5;
      }
      setIsPlayingAnimation(false);
    };

    const handleLastStep = async () => {
      await handleFinishTutorial();
      setIsTutorial(false);
      setShowTutorial(false);
      setOpen(true);
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
    setIsVisible,
    setIsTutorial,
    setShowTutorial,
    handleFinishTutorial,
    stepsInfo.boardStep,
    stepsInfo.buttonStep,
    stepsInfo.level1ExplanationStep,
    stepsInfo.level1PlayStep,
    stepsInfo.level2ExplanationStep,
    stepsInfo.lastStep,
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
