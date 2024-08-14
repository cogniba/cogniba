"use client";

import useGameLogic from "@/hooks/useGameLogic";
import Game from "./Game";

interface GameLogicProps {
  startingLevel: number;
  showFeedbackEnabled: boolean;
}

export default function GameLogic({
  startingLevel,
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
  } = useGameLogic({ startingLevel, showFeedbackEnabled });

  return (
    <Game
      feedback={feedback}
      // isStartScreenVisible={!isPlaying}
      isStartScreenVisible={false}
      startPlaying={startPlaying}
      correctHits={correctHits}
      incorrectHits={incorrectHits}
      missedHits={missedHits}
      previousLevel={previousLevel}
      level={level}
      selectedSquare={selectedSquare}
      isButtonPressed={isButtonPressed}
      handleButtonPress={handleButtonPress}
    />
  );
}
