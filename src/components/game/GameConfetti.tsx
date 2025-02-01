"use client";

import useWindowSize from "@/hooks/useWindowSize";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface GameConfettiProps {
  hasIncreasedLevel: boolean;
}

export default function GameConfetti({ hasIncreasedLevel }: GameConfettiProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [hideConfetti, setHideConfetti] = useState(true);

  const { height, width } = useWindowSize();

  useEffect(() => {
    if (hasIncreasedLevel) {
      setShowConfetti(true);
      setHideConfetti(false);
      setTimeout(() => {
        setShowConfetti(false);
        setTimeout(() => {
          setHideConfetti(true);
        }, 10000);
      }, 3000);
    }
  }, [hasIncreasedLevel]);

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
