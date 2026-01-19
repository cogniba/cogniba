"use client";

import { createContext, useContext } from "react";
import GameSessionProvider, {
  useGameSession,
  type GameFeedback,
} from "@/context/GameSessionContext";
import GameUIProvider, { useGameUI } from "@/context/GameUIContext";

export type GameContextValue = {
  isTutorial: boolean;
  level: number;
  startPlaying: () => Promise<void>;
  isPlaying: boolean;
  previousLevel: number;
  feedback: GameFeedback;
  hasReachedNewLevel: boolean;
  setHasReachedNewLevel: React.Dispatch<React.SetStateAction<boolean>>;
  isStartScreenVisible: boolean;
  correctHits: number | null;
  incorrectHits: number | null;
  missedHits: number | null;
  selectedSquare: number | null;
  isButtonPressed: boolean;
  handleButtonPress: () => Promise<void>;
  setSelectedSquare: React.Dispatch<React.SetStateAction<number | null>>;
  setIsButtonPressed: React.Dispatch<React.SetStateAction<boolean>>;
  showTutorial: boolean;
  setShowTutorial: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTutorial: React.Dispatch<React.SetStateAction<boolean>>;
  gamesPlayedToday: number;
};

const GameContext = createContext<GameContextValue | null>(null);

type GameContextProviderProps = {
  children: React.ReactNode;
  startingLevel: number;
  hasFinishedTutorial: boolean;
  showFeedbackEnabled: boolean;
  maxLevel: number;
  startingGamesPlayedToday: number;
};

export default function GameContextProvider({
  children,
  startingLevel,
  maxLevel,
  hasFinishedTutorial,
  showFeedbackEnabled,
  startingGamesPlayedToday,
}: GameContextProviderProps) {
  return (
    <GameUIProvider>
      <GameSessionProvider
        startingLevel={startingLevel}
        maxLevel={maxLevel}
        hasFinishedTutorial={hasFinishedTutorial}
        showFeedbackEnabled={showFeedbackEnabled}
        startingGamesPlayedToday={startingGamesPlayedToday}
      >
        <GameContextBridge>{children}</GameContextBridge>
      </GameSessionProvider>
    </GameUIProvider>
  );
}

type GameContextBridgeProps = {
  children: React.ReactNode;
};

function GameContextBridge({ children }: GameContextBridgeProps) {
  const session = useGameSession();
  const ui = useGameUI();

  const isStartScreenVisible = !session.isPlaying && !session.isTutorial;

  return (
    <GameContext.Provider
      value={{
        ...session,
        isStartScreenVisible,
        selectedSquare: ui.selectedSquare,
        isButtonPressed: ui.isButtonPressed,
        setSelectedSquare: ui.setSelectedSquare,
        setIsButtonPressed: ui.setIsButtonPressed,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within GameContextProvider");
  }

  return context;
}
