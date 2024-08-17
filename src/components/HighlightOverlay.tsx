"use client";

import useElementDimensions from "@/hooks/useElementDimensions";
import { cn } from "@/lib/cn";
import { useRef } from "react";

interface HighlightOverlayProps {
  targetElement: string;
  isVisible: boolean;
  padding?: number;
}

export default function HighlightOverlay({
  targetElement,
  isVisible,
  padding = 8,
}: HighlightOverlayProps) {
  const currentTargetElementRef = useRef(targetElement);
  const previousTargetElementRef = useRef(targetElement);

  const elementDimensions = useElementDimensions(
    targetElement === "body" ? previousTargetElementRef.current : targetElement,
    padding,
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

  return (
    <div
      data-state={isVisible ? "open" : "closed"}
      className="pointer-events-auto fixed inset-0 z-50 bg-black/50 mix-blend-hard-light data-[state=closed]:invisible data-[state=closed]:duration-500 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    >
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
