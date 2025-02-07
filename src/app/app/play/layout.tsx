import redirectToError from "@/actions/redirectToError";
import GameContextProvider from "@/context/GameContext";
import GameTutorialContextProvider from "@/context/GameTutorialContext";
import fetchGameData from "@/lib/game/fetchGameData";

interface GameLayoutProps {
  children: React.ReactNode;
}

export default async function GameLayout({ children }: GameLayoutProps) {
  const {
    level,
    maxLevel,
    showFeedback,
    hasFinishedTutorial,
    gamesPlayedToday,
    error,
  } = await fetchGameData();
  if (
    error ||
    !level ||
    !maxLevel ||
    showFeedback === undefined ||
    hasFinishedTutorial === undefined ||
    gamesPlayedToday === undefined
  ) {
    redirectToError("Error getting game data");
    return;
  }

  return (
    <GameContextProvider
      startingLevel={level}
      maxLevel={maxLevel}
      hasFinishedTutorial={hasFinishedTutorial}
      showFeedbackEnabled={showFeedback}
      startingGamesPlayedToday={gamesPlayedToday}
    >
      <GameTutorialContextProvider>{children}</GameTutorialContextProvider>
    </GameContextProvider>
  );
}
