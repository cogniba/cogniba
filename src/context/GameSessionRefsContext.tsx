"use client";

import { createContext, useContext, useMemo, useRef } from "react";

type GameSessionRefsValue = {
  gameSequenceRef: React.RefObject<number[]>;
  correctHitSequenceRef: React.RefObject<boolean[]>;
  playerHitSequenceRef: React.RefObject<boolean[]>;
  hasPressedButtonRef: React.RefObject<boolean>;
  shouldPressButtonRef: React.RefObject<boolean>;
  maxLevelRef: React.RefObject<number>;
  selectedSquareRef: React.RefObject<number | null>;
  isButtonPressedRef: React.RefObject<boolean>;
  setSelectedSquare: (value: number | null) => void;
  setIsButtonPressed: (value: boolean) => void;
};

const GameSessionRefsContext = createContext<GameSessionRefsValue | null>(null);

type GameSessionRefsProviderProps = {
  children: React.ReactNode;
  maxLevel: number;
};

export default function GameSessionRefsProvider({
  children,
  maxLevel,
}: GameSessionRefsProviderProps) {
  const gameSequenceRef = useRef<number[]>([]);
  const correctHitSequenceRef = useRef<boolean[]>([]);
  const playerHitSequenceRef = useRef<boolean[]>([]);
  const hasPressedButtonRef = useRef(true);
  const shouldPressButtonRef = useRef(false);
  const maxLevelRef = useRef(maxLevel);
  const selectedSquareRef = useRef<number | null>(null);
  const isButtonPressedRef = useRef(false);

  const value = useMemo(
    () => ({
      gameSequenceRef,
      correctHitSequenceRef,
      playerHitSequenceRef,
      hasPressedButtonRef,
      shouldPressButtonRef,
      maxLevelRef,
      selectedSquareRef,
      isButtonPressedRef,
      setSelectedSquare: (value: number | null) => {
        selectedSquareRef.current = value;
      },
      setIsButtonPressed: (value: boolean) => {
        isButtonPressedRef.current = value;
      },
    }),
    [],
  );

  return (
    <GameSessionRefsContext.Provider value={value}>
      {children}
    </GameSessionRefsContext.Provider>
  );
}

export function useGameSessionRefs() {
  const context = useContext(GameSessionRefsContext);
  if (!context) {
    throw new Error(
      "useGameSessionRefs must be used within GameSessionRefsProvider",
    );
  }

  return context;
}
