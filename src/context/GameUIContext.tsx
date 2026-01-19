"use client";

import { createContext, useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type GameUIContextValue = {
  selectedSquare: number | null;
  setSelectedSquare: Dispatch<SetStateAction<number | null>>;
  isButtonPressed: boolean;
  setIsButtonPressed: Dispatch<SetStateAction<boolean>>;
};

const GameUIContext = createContext<GameUIContextValue | null>(null);

type GameUIProviderProps = {
  children: React.ReactNode;
};

export default function GameUIProvider({ children }: GameUIProviderProps) {
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);

  return (
    <GameUIContext.Provider
      value={{
        selectedSquare,
        setSelectedSquare,
        isButtonPressed,
        setIsButtonPressed,
      }}
    >
      {children}
    </GameUIContext.Provider>
  );
}

export function useGameUI() {
  const context = useContext(GameUIContext);
  if (!context) {
    throw new Error("useGameUI must be used within GameUIProvider");
  }

  return context;
}
