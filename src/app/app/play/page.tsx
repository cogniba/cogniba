"use client";

import GameTutorial from "@/components/game/tutorial/GameTutorial";
import { useGameContext } from "@/context/GameContext";
import GameLoading from "./loading";
import Game from "@/components/game/Game";

export const dynamic = "force-dynamic";

export default function GamePage() {
  const { isLoading, isTutorial } = useGameContext();

  // TODO: suspense
  if (isLoading) {
    return <GameLoading />;
  } else if (!isTutorial) {
    return <GameTutorial />;
  } else {
    return <Game />;
  }
}
