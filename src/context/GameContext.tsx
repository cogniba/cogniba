"use client";

import { useSidebar } from "@/components/ui/sidebar";
import {
  BASE_SEQUENCE_LENGTH,
  DELAY_BEFORE_START,
  HIDDEN_SQUARE_DURATION,
  VISIBLE_SQUARE_DURATION,
} from "@/config/game";
import { useToast } from "@/hooks/use-toast";
import enterFullScreen from "@/lib/enterFullScreen";
import calculateNewLevel from "@/lib/game/game-logic/calculateNewLevel";
import generateGameSequence from "@/lib/game/game-logic/generateGameSequence";
import getCorrectHitSequence from "@/lib/game/game-logic/getCorrectHitSequence";
import getHitStatistics from "@/lib/game/game-logic/getHitStatistics";
import sleep from "@/lib/sleep";
import waitFor from "@/lib/waitFor";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface GameContextValue {
  isTutorial: boolean;
  level: number;
  startPlaying: () => Promise<void>;
  isPlaying: boolean;
  previousLevel: number;
  feedback: "correct" | "incorrect" | "missed" | null;
  hasReachedNewLevel: boolean;
  setHasReachedNewLevel: Dispatch<SetStateAction<boolean>>;
  isStartScreenVisible: boolean;
  correctHits: number | null;
  incorrectHits: number | null;
  missedHits: number | null;
  selectedSquare: number | null;
  isButtonPressed: boolean;
  handleButtonPress: () => Promise<void>;
  setSelectedSquare: Dispatch<SetStateAction<number | null>>;
  setIsButtonPressed: Dispatch<SetStateAction<boolean>>;
  showTutorial: boolean;
  setShowTutorial: Dispatch<SetStateAction<boolean>>;
  setIsTutorial: Dispatch<SetStateAction<boolean>>;
}

export const GameContext = createContext<GameContextValue>({
  isTutorial: false,
  level: -1,
  startPlaying: async () => {},
  isPlaying: false,
  previousLevel: -1,
  feedback: null,
  hasReachedNewLevel: false,
  setHasReachedNewLevel: () => {},
  isStartScreenVisible: false,
  correctHits: null,
  incorrectHits: null,
  missedHits: null,
  selectedSquare: null,
  isButtonPressed: false,
  handleButtonPress: async () => {},
  setSelectedSquare: () => {},
  setIsButtonPressed: () => {},
  showTutorial: false,
  setShowTutorial: () => {},
  setIsTutorial: () => {},
});

interface GameContextProviderProps {
  children: React.ReactNode;
  startingLevel: number;
  hasFinishedTutorial: boolean;
  showFeedbackEnabled: boolean;
  maxLevel: number;
}

export default function GameContextProvider({
  children,
  startingLevel,
  maxLevel,
  hasFinishedTutorial,
  showFeedbackEnabled,
}: GameContextProviderProps) {
  const [level, setLevel] = useState(startingLevel);
  const [previousLevel, setPreviousLevel] = useState(-1);
  const [hasReachedNewLevel, setHasReachedNewLevel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [correctHits, setCorrectHits] = useState<number | null>(null);
  const [incorrectHits, setIncorrectHits] = useState<number | null>(null);
  const [missedHits, setMissedHits] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<
    "correct" | "incorrect" | "missed" | null
  >(null);
  const [isTutorial, setIsTutorial] = useState(!hasFinishedTutorial);
  const [showTutorial, setShowTutorial] = useState(!hasFinishedTutorial);

  const { setOpen } = useSidebar();
  const { toast } = useToast();

  const gameSequenceRef = useRef<number[]>([]);
  const correctHitSequenceRef = useRef<boolean[]>([]);
  const playerHitSequenceRef = useRef<boolean[]>([]);
  const hasPressedButtonRef = useRef(true);
  const shouldPressButtonRef = useRef(false);
  const maxLevelRef = useRef(maxLevel);

  const isStartScreenVisible = !isPlaying && !isTutorial;

  const showFeedback = useCallback(
    async (feedback: "correct" | "incorrect" | "missed") => {
      if (!showFeedbackEnabled) return;
      setFeedback(feedback);
      if (feedback === "missed") {
        await sleep(200);
      } else {
        await sleep(400);
      }
      setFeedback(null);
    },
    [showFeedbackEnabled],
  );

  const updateGameData = useCallback(async () => {
    if (!level || !maxLevelRef.current) return;

    const currentLevel = level;

    const { correctHits, incorrectHits, missedHits } = getHitStatistics(
      correctHitSequenceRef.current,
      playerHitSequenceRef.current,
    );
    setCorrectHits(correctHits);
    setIncorrectHits(incorrectHits);
    setMissedHits(missedHits);

    const newLevel = calculateNewLevel(
      correctHitSequenceRef.current,
      playerHitSequenceRef.current,
      currentLevel,
    );
    setPreviousLevel(currentLevel);
    setLevel(newLevel);

    if (newLevel > maxLevelRef.current) {
      setHasReachedNewLevel(true);
      maxLevelRef.current = newLevel;
    }

    const timePlayed =
      (BASE_SEQUENCE_LENGTH + level) *
        (VISIBLE_SQUARE_DURATION + HIDDEN_SQUARE_DURATION) +
      DELAY_BEFORE_START;

    const response = await fetch("/api/game/insert-game", {
      method: "POST",
      body: JSON.stringify({
        level,
        newLevel,
        correctHits,
        incorrectHits,
        missedHits,
        timePlayed,
      }),
    });

    if (!response.ok) {
      toast({ title: "Unexpected error occurred", variant: "destructive" });
    }
  }, [level, toast]);

  const playGame = useCallback(async () => {
    let step = 0;

    hasPressedButtonRef.current = false;
    for (const position of gameSequenceRef.current) {
      shouldPressButtonRef.current = correctHitSequenceRef.current[step];

      setSelectedSquare(position);
      await sleep(VISIBLE_SQUARE_DURATION);

      if (
        isTutorial &&
        correctHitSequenceRef.current[step] &&
        !hasPressedButtonRef.current
      ) {
        setShowTutorial(true);
        await waitFor(() => hasPressedButtonRef.current);
        setShowTutorial(false);
      }

      setSelectedSquare(null);
      await sleep(HIDDEN_SQUARE_DURATION);

      if (hasPressedButtonRef.current) {
        playerHitSequenceRef.current.push(true);
      } else {
        playerHitSequenceRef.current.push(false);
      }

      if (correctHitSequenceRef.current[step] && !hasPressedButtonRef.current) {
        showFeedback("missed");
      }

      hasPressedButtonRef.current = false;
      shouldPressButtonRef.current = false;
      step++;
    }

    setIsPlaying(false);
    setOpen(true);

    await updateGameData();
  }, [setOpen, updateGameData, isTutorial, setShowTutorial, showFeedback]);

  const startPlaying = useCallback(async () => {
    if (!level) return;

    setIsPlaying(true);
    setOpen(false);
    setHasReachedNewLevel(false);

    gameSequenceRef.current = generateGameSequence(level);
    correctHitSequenceRef.current = getCorrectHitSequence(
      gameSequenceRef.current,
      level,
    );
    playerHitSequenceRef.current = [];

    await sleep(DELAY_BEFORE_START);
    await playGame();
  }, [level, playGame, setOpen]);

  const handleShowFeedback = useCallback(async () => {
    if (correctHitSequenceRef.current[playerHitSequenceRef.current.length]) {
      await showFeedback("correct");
    } else {
      await showFeedback("incorrect");
    }
  }, [showFeedback]);

  const handleButtonPress = useCallback(async () => {
    if (!hasPressedButtonRef.current) {
      if (isTutorial && !shouldPressButtonRef.current) return;

      hasPressedButtonRef.current = true;
      setIsButtonPressed(true);
      handleShowFeedback();
      await sleep(400);
      setIsButtonPressed(false);
    }
  }, [handleShowFeedback, isTutorial]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        handleButtonPress();
      }
    };
    addEventListener("keydown", handleKeyDown);

    return () => removeEventListener("keydown", handleKeyDown);
  }, [handleButtonPress]);

  useEffect(() => {
    if (isPlaying || isTutorial) {
      window.onbeforeunload = () => {
        return "If you leave the page, you will lose your progress.";
      };
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
    <GameContext.Provider
      value={{
        isTutorial,
        level,
        startPlaying,
        isPlaying,
        previousLevel,
        feedback,
        hasReachedNewLevel,
        setHasReachedNewLevel,
        isStartScreenVisible,
        correctHits,
        incorrectHits,
        missedHits,
        selectedSquare,
        isButtonPressed,
        handleButtonPress,
        setSelectedSquare,
        setIsButtonPressed,
        showTutorial,
        setShowTutorial,
        setIsTutorial,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
