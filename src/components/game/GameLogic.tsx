"use client";

import useGameLogic from "@/hooks/useGameLogic";
import Game from "./Game";

interface GameLogicProps {
  startingLevel: number;
  startingMaxLevel: number;
  showFeedbackEnabled: boolean;
}

export default function GameLogic({
  startingLevel,
  startingMaxLevel,
  showFeedbackEnabled,
}: GameLogicProps) {
  const {
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
  } = useGameLogic({ startingLevel, startingMaxLevel, showFeedbackEnabled });

  return (
    <Game
      feedback={feedback}
      isStartScreenVisible={!isPlaying}
      startPlaying={startPlaying}
      correctHits={correctHits}
      incorrectHits={incorrectHits}
      missedHits={missedHits}
      previousLevel={previousLevel}
      level={level}
      selectedSquare={selectedSquare}
      isButtonPressed={isButtonPressed}
      handleButtonPress={handleButtonPress}
      hasReachedNewLevel={hasReachedNewLevel}
      setHasReachedNewLevel={setHasReachedNewLevel}
    />
  );
}
