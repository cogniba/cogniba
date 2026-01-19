"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Dispatch, SetStateAction } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import gameConfig from "@/config/gameConfig";
import { useToast } from "@/hooks/use-toast";
import enterFullScreen from "@/lib/enterFullScreen";
import calculateNewLevel from "@/lib/game/game-logic/calculateNewLevel";
import generateGameSequence from "@/lib/game/game-logic/generateGameSequence";
import getCorrectHitSequence from "@/lib/game/game-logic/getCorrectHitSequence";
import getHitStatistics from "@/lib/game/game-logic/getHitStatistics";
import sleep from "@/lib/sleep";
import waitFor from "@/lib/waitFor";
import { usePostHog } from "posthog-js/react";
import insertGame from "@/actions/game/insertGame";
import { useGameUI } from "@/context/GameUIContext";

export type GameFeedback = "correct" | "incorrect" | "missed" | null;

type GameSessionState = {
  level: number;
  previousLevel: number;
  isPlaying: boolean;
  feedback: GameFeedback;
  hasReachedNewLevel: boolean;
  isTutorial: boolean;
  gamesPlayedToday: number;
  correctHits: number | null;
  incorrectHits: number | null;
  missedHits: number | null;
};

type GameSessionContextValue = GameSessionState & {
  startPlaying: () => Promise<void>;
  handleButtonPress: () => Promise<void>;
  setHasReachedNewLevel: Dispatch<SetStateAction<boolean>>;
  setIsTutorial: Dispatch<SetStateAction<boolean>>;
  showTutorial: boolean;
  setShowTutorial: Dispatch<SetStateAction<boolean>>;
};

const GameSessionContext = createContext<GameSessionContextValue | null>(null);

type GameSessionProviderProps = {
  children: React.ReactNode;
  startingLevel: number;
  hasFinishedTutorial: boolean;
  showFeedbackEnabled: boolean;
  maxLevel: number;
  startingGamesPlayedToday: number;
};

export default function GameSessionProvider({
  children,
  startingLevel,
  maxLevel,
  hasFinishedTutorial,
  showFeedbackEnabled,
  startingGamesPlayedToday,
}: GameSessionProviderProps) {
  const { parameters } = gameConfig;
  const posthog = usePostHog();
  const { toast } = useToast();
  const { setOpen } = useSidebar();
  const { setSelectedSquare, setIsButtonPressed } = useGameUI();

  const gameSequenceRef = useRef<number[]>([]);
  const correctHitSequenceRef = useRef<boolean[]>([]);
  const playerHitSequenceRef = useRef<boolean[]>([]);
  const hasPressedButtonRef = useRef(true);
  const shouldPressButtonRef = useRef(false);
  const maxLevelRef = useRef(maxLevel);

  const [level, setLevel] = useState(startingLevel);
  const [previousLevel, setPreviousLevel] = useState(startingLevel);
  const [hasReachedNewLevel, setHasReachedNewLevel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState<GameFeedback>(null);
  const [isTutorial, setIsTutorial] = useState(!hasFinishedTutorial);
  const [showTutorial, setShowTutorial] = useState(true);
  const [gamesPlayedToday, setGamesPlayedToday] = useState(
    startingGamesPlayedToday,
  );
  const [correctHits, setCorrectHits] = useState<number | null>(null);
  const [incorrectHits, setIncorrectHits] = useState<number | null>(null);
  const [missedHits, setMissedHits] = useState<number | null>(null);

  const showFeedback = useCallback(
    async (nextFeedback: Exclude<GameFeedback, null>) => {
      if (!showFeedbackEnabled) return;
      setFeedback(nextFeedback);
      await sleep(nextFeedback === "missed" ? 200 : 400);
      setFeedback(null);
    },
    [showFeedbackEnabled],
  );

  const updateGameData = useCallback(async () => {
    const currentLevel = level;

    const stats = getHitStatistics(
      correctHitSequenceRef.current,
      playerHitSequenceRef.current,
    );

    setCorrectHits(stats.correctHits);
    setIncorrectHits(stats.incorrectHits);
    setMissedHits(stats.missedHits);

    const newLevel = calculateNewLevel(
      correctHitSequenceRef.current,
      playerHitSequenceRef.current,
      currentLevel,
    );

    setPreviousLevel(currentLevel);
    setLevel(newLevel);
    setGamesPlayedToday((prev) => prev + 1);

    if (newLevel > maxLevelRef.current) {
      setHasReachedNewLevel(true);
      maxLevelRef.current = newLevel;
    }

    const timePlayed =
      (parameters.baseSequenceLength + level) *
        (parameters.visibleSquareDuration + parameters.hiddenSquareDuration) +
      parameters.delayBeforeStart;

    posthog.capture("game_end", {
      level,
      new_level: newLevel,
      correct_hits: stats.correctHits,
      incorrect_hits: stats.incorrectHits,
      missed_hits: stats.missedHits,
      time_played: timePlayed,
      show_feedback: showFeedbackEnabled,
    });

    const result = await insertGame({
      level,
      newLevel,
      correctHits: stats.correctHits,
      incorrectHits: stats.incorrectHits,
      missedHits: stats.missedHits,
      timePlayed,
    });

    if (result.error) {
      toast({ title: result.error, variant: "destructive" });
    }
  }, [
    level,
    parameters.baseSequenceLength,
    parameters.delayBeforeStart,
    parameters.hiddenSquareDuration,
    parameters.visibleSquareDuration,
    posthog,
    showFeedbackEnabled,
    toast,
  ]);

  const playGame = useCallback(async () => {
    let step = 0;

    hasPressedButtonRef.current = false;
    for (const position of gameSequenceRef.current) {
      shouldPressButtonRef.current =
        correctHitSequenceRef.current[step] ?? false;

      setSelectedSquare(position);
      await sleep(parameters.visibleSquareDuration);

      if (isTutorial) {
        await waitFor(() => hasPressedButtonRef.current);
      }

      setSelectedSquare(null);
      await sleep(parameters.hiddenSquareDuration);

      playerHitSequenceRef.current.push(hasPressedButtonRef.current);

      void showFeedback("missed");

      hasPressedButtonRef.current = false;
      shouldPressButtonRef.current = false;
      step++;
    }

    setIsPlaying(false);
    setOpen(true);

    await updateGameData();
  }, [
    isTutorial,
    parameters.hiddenSquareDuration,
    parameters.visibleSquareDuration,
    setOpen,
    setSelectedSquare,
    showFeedback,
    updateGameData,
  ]);

  const startPlaying = useCallback(async () => {
    setIsPlaying(true);
    setOpen(false);
    setHasReachedNewLevel(false);

    gameSequenceRef.current = generateGameSequence(level);
    correctHitSequenceRef.current = getCorrectHitSequence(
      gameSequenceRef.current,
      level,
    );
    playerHitSequenceRef.current = [];

    void posthog.capture("game_start", {
      level,
      show_feedback: showFeedbackEnabled,
    });

    await sleep(parameters.delayBeforeStart);
    await playGame();
  }, [
    level,
    parameters.delayBeforeStart,
    playGame,
    posthog,
    setOpen,
    showFeedbackEnabled,
  ]);

  const handleShowFeedback = useCallback(async () => {
    if (correctHitSequenceRef.current[playerHitSequenceRef.current.length]) {
      await showFeedback("correct");
    } else {
      await showFeedback("incorrect");
    }
  }, [showFeedback]);

  const handleButtonPress = useCallback(async () => {
    if (hasPressedButtonRef.current) {
      return;
    }

    if (isTutorial && !shouldPressButtonRef.current) {
      return;
    }

    hasPressedButtonRef.current = true;
    setIsButtonPressed(true);
    void handleShowFeedback();
    await sleep(400);
    setIsButtonPressed(false);
  }, [handleShowFeedback, isTutorial, setIsButtonPressed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        void handleButtonPress();
      }
    };
    addEventListener("keydown", handleKeyDown);

    return () => {
      removeEventListener("keydown", handleKeyDown);
    };
  }, [handleButtonPress]);

  useEffect(() => {
    if (isPlaying || isTutorial) {
      window.onbeforeunload = () =>
        "If you leave the page, you will lose your progress.";
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [isPlaying, isTutorial]);

  useEffect(() => {
    if (isPlaying) {
      enterFullScreen();
    }
  }, [isPlaying]);

  return (
    <GameSessionContext.Provider
      value={{
        level,
        previousLevel,
        isPlaying,
        feedback,
        hasReachedNewLevel,
        isTutorial,
        gamesPlayedToday,
        correctHits,
        incorrectHits,
        missedHits,
        startPlaying,
        handleButtonPress,
        setHasReachedNewLevel,
        setIsTutorial,
        showTutorial,
        setShowTutorial,
      }}
    >
      {children}
    </GameSessionContext.Provider>
  );
}

export function useGameSession() {
  const context = useContext(GameSessionContext);
  if (!context) {
    throw new Error("useGameSession must be used within GameSessionProvider");
  }

  return context;
}
