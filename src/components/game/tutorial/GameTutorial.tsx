"use client";

import Game from "@/components/game/Game";
import GameTutorialSteps from "@/components/game/tutorial/GameTutorialSteps";

export default function GameTutorial() {
  return (
    <>
      <GameTutorialSteps showSkipButton={true} />
      <Game />
    </>
  );
}
