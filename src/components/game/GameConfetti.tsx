"use client";

import useWindowSize from "@/hooks/useWindowSize";
import { useCallback, useEffect, useState } from "react";
import Confetti from "react-confetti";

type GameConfettiProps = {
  hasIncreasedLevel: boolean;
}

export default function GameConfetti({ hasIncreasedLevel }: GameConfettiProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [hideConfetti, setHideConfetti] = useState(true);

  const { height, width } = useWindowSize();

  const showConfettiForLevel = useCallback(() => {
    setShowConfetti(true);
    setHideConfetti(false);

    const stopTimeout = window.setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    const hideTimeout = window.setTimeout(() => {
      setHideConfetti(true);
    }, 13000);

    return () => {
      window.clearTimeout(stopTimeout);
      window.clearTimeout(hideTimeout);
    };
  }, []);

  useEffect(() => {
    if (!hasIncreasedLevel) return;

    const cleanup = showConfettiForLevel();
    return cleanup;
  }, [hasIncreasedLevel, showConfettiForLevel]);

  if (hideConfetti) {
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
