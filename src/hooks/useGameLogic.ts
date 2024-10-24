import sleep from "@/lib/sleep";
import generateGameSequence from "@/lib/game-logic/generateGameSequence";
import getCorrectHitSequence from "@/lib/game-logic/getCorrectHitSequence";
import waitFor from "@/lib/waitFor";
import getHitStatistics from "@/lib/game-logic/getHitStatistics";
import calculateNewLevel from "@/lib/game-logic/calculateNewLevel";

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSidebar } from "@/context/SidebarContext";
import {
  gameBaseSequenceLength,
  gameDelayBeforeStart,
  gameHiddenSquareDuration,
  gameVisibleSquareDuration,
} from "@/settings/constants";

interface useGameLogicProps {
  startingLevel: number;
  showFeedbackEnabled: boolean;
  isTutorial?: boolean;
  setShowTutorialHint?: Dispatch<SetStateAction<boolean>>;
}

export default function useGameLogic({
  startingLevel,
  showFeedbackEnabled,
  isTutorial = false,
  setShowTutorialHint = () => {},
}: useGameLogicProps) {
  const [level, setLevel] = useState<number>(startingLevel);
  const [previousLevel, setPreviousLevel] = useState<number>(startingLevel);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [correctHits, setCorrectHits] = useState<number | null>(null);
  const [incorrectHits, setIncorrectHits] = useState<number | null>(null);
  const [missedHits, setMissedHits] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<
    "correct" | "incorrect" | "missed" | null
  >(null);
  const [hasReachedNewLevel, setHasReachedNewLevel] = useState(false);

  const { setIsVisible } = useSidebar();

  const gameSequence = useRef<number[]>([]);
  const correctHitSequence = useRef<boolean[]>([]);
  const playerHitSequence = useRef<boolean[]>([]);
  const hasPressedButton = useRef(true);
  const shouldPressButton = useRef(false);
  const maxLevel = useRef<number>(startingLevel);

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

  const handleShowFeedback = useCallback(async () => {
    if (correctHitSequence.current[playerHitSequence.current.length]) {
      await showFeedback("correct");
    } else {
      await showFeedback("incorrect");
    }
  }, [showFeedback]);

  const updateGameData = useCallback(async () => {
    const currentLevel = level;

    const { correctHits, incorrectHits, missedHits } = getHitStatistics(
      correctHitSequence.current,
      playerHitSequence.current,
    );
    setCorrectHits(correctHits);
    setIncorrectHits(incorrectHits);
    setMissedHits(missedHits);

    const newLevel = calculateNewLevel(
      correctHitSequence.current,
      playerHitSequence.current,
      currentLevel,
    );
    setPreviousLevel(currentLevel);
    setLevel(newLevel);

    if (newLevel > maxLevel.current) {
      setHasReachedNewLevel(true);
      maxLevel.current = newLevel;
    }

    const timePlayed =
      (gameBaseSequenceLength + level) *
        (gameVisibleSquareDuration + gameHiddenSquareDuration) +
      gameDelayBeforeStart;

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
      console.error("Error inserting game data");
    }
  }, [level]);

  const playGame = useCallback(async () => {
    let step = 0;

    hasPressedButton.current = false;
    for (const position of gameSequence.current) {
      shouldPressButton.current = correctHitSequence.current[step];

      setSelectedSquare(position);
      await sleep(gameVisibleSquareDuration);

      if (
        isTutorial &&
        correctHitSequence.current[step] &&
        !hasPressedButton.current
      ) {
        setShowTutorialHint(true);
        await waitFor(() => hasPressedButton.current);
        setShowTutorialHint(false);
      }

      setSelectedSquare(null);
      await sleep(gameHiddenSquareDuration);

      if (hasPressedButton.current) {
        playerHitSequence.current.push(true);
      } else {
        playerHitSequence.current.push(false);
      }

      if (correctHitSequence.current[step] && !hasPressedButton.current) {
        showFeedback("missed");
      }

      hasPressedButton.current = false;
      shouldPressButton.current = false;
      step++;
    }

    setIsPlaying(false);
    setIsVisible(true);

    await updateGameData();
  }, [
    setIsVisible,
    showFeedback,
    updateGameData,
    isTutorial,
    setShowTutorialHint,
  ]);

  const startPlaying = useCallback(async () => {
    if (!level) return;

    setIsPlaying(true);
    setIsVisible(false);
    setHasReachedNewLevel(false);

    gameSequence.current = generateGameSequence(level);
    correctHitSequence.current = getCorrectHitSequence(
      gameSequence.current,
      level,
    );
    playerHitSequence.current = [];

    await sleep(gameDelayBeforeStart);
    await playGame();
  }, [level, playGame, setIsVisible]);

  const handleButtonPress = useCallback(async () => {
    if (!hasPressedButton.current) {
      if (isTutorial && !shouldPressButton.current) return;

      hasPressedButton.current = true;
      setIsButtonPressed(true);
      handleShowFeedback();
      await sleep(400);
      setIsButtonPressed(false);
    }
  }, [handleShowFeedback, isTutorial]);

  useEffect(() => {
    addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        handleButtonPress();
      }
    });
  }, [handleButtonPress]);

  useEffect(() => {
    const fetchMaxLevel = async () => {
      // maxLevel.current = await getMaxLevel();
      // TODO: Get max level
    };

    fetchMaxLevel();
  }, []);

  useEffect(() => {
    if (isPlaying || isTutorial) {
      window.onbeforeunload = () => {
        return "If you leave the page, you will lose your progress.";
      };
    }
  }, [isPlaying, isTutorial]);

  return {
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
    hasReachedNewLevel,
    setHasReachedNewLevel,
  };
}
