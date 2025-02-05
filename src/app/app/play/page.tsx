"use client";

import { useGameContext } from "@/context/GameContext";
import Game from "@/components/game/Game";
import GameTutorialSteps from "@/components/game/tutorial/GameTutorialSteps";

export const dynamic = "force-dynamic";

export default function GamePage() {
  const { isTutorial } = useGameContext();

  return (
    <>
      {isTutorial && <GameTutorialSteps showSkipButton={true} />}
      <Game />
    </>
  );
}
