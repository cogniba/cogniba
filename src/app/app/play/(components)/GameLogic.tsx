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
    isSpaceBarPressed,
    handleSpaceBarPress,
  } = useGameLogic({ startingLevel, showFeedbackEnabled });

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
      isSpaceBarPressed={isSpaceBarPressed}
      handlePressSpaceBar={handleSpaceBarPress}
    />
  );
}
