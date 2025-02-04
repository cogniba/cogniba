"use client";

import Game from "@/components/game/Game";
import GameTutorialSteps from "@/components/game/tutorial/GameTutorialSteps";
import GameTutorialContextProvider from "@/context/GameTutorialContext";

export default function GameTutorial() {
  return (
    <>
      <GameTutorialContextProvider>
        <GameTutorialSteps />
      </GameTutorialContextProvider>
      <Game />
    </>
  );
}
