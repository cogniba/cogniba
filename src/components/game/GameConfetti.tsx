"use client";

import useWindowSize from "@/hooks/useWindowSize";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

type GameConfettiProps = {
  hasIncreasedLevel: boolean;
};

export default function GameConfetti({ hasIncreasedLevel }: GameConfettiProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  const { height, width } = useWindowSize();

  useEffect(() => {
    if (!hasIncreasedLevel) return;

    const startTimeout = window.setTimeout(() => {
      setShowConfetti(true);
    }, 0);

    const stopTimeout = window.setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => {
      window.clearTimeout(startTimeout);
      window.clearTimeout(stopTimeout);
    };
  }, [hasIncreasedLevel]);

  if (!showConfetti) {
    return null;
  }

  return (
    <Confetti
      style={{ zIndex: 100 }}
      height={height}
      width={width}
      numberOfPieces={300}
      tweenDuration={10000}
      recycle={showConfetti}
    />
  );
}
