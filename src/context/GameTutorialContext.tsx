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
import type { StepType } from "@/config/gameTutorialConfig";
import gameTutorialConfig from "@/config/gameTutorialConfig";
import updateProfile from "@/actions/updateProfile";
import redirectToError from "@/actions/redirectToError";
import { usePostHog } from "posthog-js/react";

type GameTutorialContextValue = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isVisible: boolean;
  isLoading: boolean;
  handleFinishTutorial: () => void;
  steps: readonly StepType[];
};

const noop = () => {
  return;
};

export const GameTutorialContext = createContext<GameTutorialContextValue>({
  step: 0,
  setStep: noop,
  isVisible: false,
  isLoading: false,
  handleFinishTutorial: noop,
  steps: [],
});

type GameTutorialContextProviderProps = {
  children: React.ReactNode;
};

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
  const { tutorialSteps, stepsInfo } = gameTutorialConfig;

  const getSteps = useCallback(
    () =>
      isTutorial ? tutorialSteps : gameTutorialConfig.getNewLevelSteps(level),
    [isTutorial, level, tutorialSteps],
  );

  const [step, setStep] = useState(level === 1 ? 0 : stepsInfo.level1BeatStep);
  const isPlayingAnimationRef = useRef(false);
  const [isLoadingGame, setIsLoadingGame] = useState(false);

  const stepRef = useRef(level === 1 ? 0 : stepsInfo.level1BeatStep);

  const [isPending, startTransition] = useTransition();

  const { setOpen } = useSidebar();

  const handleFinishTutorial = useCallback(() => {
    startTransition(() => {
      void (async () => {
        const result = await updateProfile({ hasFinishedTutorial: true });

        if (result.error) {
          void redirectToError(result.error);
          return;
        }

        setIsTutorial(false);
        setShowTutorial(true);
        setStep(0);
        setOpen(true);
      })();
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
      isPlayingAnimationRef.current = false;
    };

    const buttonStepAnimation = async () => {
      while (stepRef.current === stepsInfo.buttonStep) {
        setIsButtonPressed(true);
        await sleep(400);
        setIsButtonPressed(false);
        await sleep(2000);
      }
      isPlayingAnimationRef.current = false;
    };
    const level1ExplanationAnimation = async () => {
      while (stepRef.current === stepsInfo.level1ExplanationStep) {
        setSelectedSquare(6);
        await sleep(parameters.visibleSquareDuration);
        setSelectedSquare(null);
        await sleep(parameters.hiddenSquareDuration);
      }

      isPlayingAnimationRef.current = false;
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
      isPlayingAnimationRef.current = false;
    };

    const handleLastStep = () => {
      void posthog.capture("tutorial_complete", {
        has_skipped: false,
      });
      handleFinishTutorial();
    };

    if (stepRef.current === stepsInfo.boardStep) {
      if (!isPlayingAnimationRef.current) {
        isPlayingAnimationRef.current = true;
        void boardStepAnimation();
      }
    } else if (stepRef.current === stepsInfo.buttonStep) {
      if (!isPlayingAnimationRef.current) {
        isPlayingAnimationRef.current = true;
        void buttonStepAnimation();
      }
    } else if (stepRef.current === stepsInfo.level1ExplanationStep) {
      if (!isPlayingAnimationRef.current) {
        isPlayingAnimationRef.current = true;
        void level1ExplanationAnimation();
      }
    } else if (stepRef.current === stepsInfo.level1PlayStep) {
      if (!isPlaying) {
        void handleStartGameDelay();
        void startTutorialGame();
      }
    } else if (stepRef.current === stepsInfo.level2ExplanationStep) {
      if (!isPlayingAnimationRef.current) {
        isPlayingAnimationRef.current = true;
        void level2ExplanationAnimation();
      }
    } else if (stepRef.current === stepsInfo.lastStep) {
      handleLastStep();
    }
  }, [
    isVisible,
    step,
    startPlaying,
    isPlaying,
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
        steps: getSteps(),
      }}
    >
      {children}
    </GameTutorialContext.Provider>
  );
}

export function useGameTutorialContext() {
  return useContext(GameTutorialContext);
}
