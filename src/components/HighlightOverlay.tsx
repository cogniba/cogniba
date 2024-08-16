"use client";

import useElementDimensions from "@/hooks/useElementDimensions";
import { cn } from "@/lib/cn";
import { useEffect, useRef } from "react";

interface HighlightOverlayProps {
  targetElement: string;
  padding?: number;
}

export default function HighlightOverlay({
  targetElement,
  padding = 8,
}: HighlightOverlayProps) {
  const currentTargetElementRef = useRef(targetElement);
  const previousTargetElementRef = useRef(targetElement);

  const elementDimensions = useElementDimensions(
    targetElement === "body" ? previousTargetElementRef.current : targetElement,
  );
  const { height, width, top, left } = elementDimensions ?? {
    height: 0,
    width: 0,
    top: 0,
    left: 0,
  };

  if (currentTargetElementRef.current !== targetElement) {
    previousTargetElementRef.current = currentTargetElementRef.current;
    currentTargetElementRef.current = targetElement;
  }

  console.log(targetElement + "\n" + previousTargetElementRef.current);

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-black/50 mix-blend-hard-light">
      <div
        className={cn(
          "absolute rounded-lg bg-[#808080] opacity-100",
          targetElement === "body" ||
            previousTargetElementRef.current === "body"
            ? "transition-opacity duration-500"
            : "transition-bounding-box duration-500",
          (!elementDimensions || targetElement === "body") && "opacity-0",
        )}
        style={{
          height,
          width,
          top,
          left,
        }}
      ></div>
    </div>
  );
}
