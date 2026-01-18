"use client";

import useElementDimensions from "@/hooks/useElementDimensions";
import { cn } from "@/lib/cn";
import { useEffect, useRef, useState } from "react";

interface HighlightOverlayProps {
  targetElement: string;
  isVisible: boolean;
  elementClickable: boolean;
  padding?: number;
}

export default function HighlightOverlay({
  targetElement,
  isVisible,
  elementClickable,
  padding = 8,
}: HighlightOverlayProps) {
  const currentTargetElementRef = useRef(targetElement);
  const previousTargetElementRef = useRef(targetElement);
  const [measuredTarget, setMeasuredTarget] = useState(targetElement);

  const elementDimensions = useElementDimensions(
    measuredTarget === "body"
      ? previousTargetElementRef.current
      : measuredTarget,
    padding,
  );
  const { height, width, top, left } = elementDimensions ?? {
    height: 0,
    width: 0,
    top: 0,
    left: 0,
    element: null,
  };

  useEffect(() => {
    if (currentTargetElementRef.current !== targetElement) {
      previousTargetElementRef.current = currentTargetElementRef.current;
      currentTargetElementRef.current = targetElement;
    }
    setMeasuredTarget(targetElement);
  }, [targetElement]);

  useEffect(() => {
    if (!elementClickable) return;

    const newElement = document.querySelector(targetElement);

    if (newElement instanceof HTMLElement && targetElement !== "body") {
      newElement.style.pointerEvents = "auto";
    }

    return () => {
      if (newElement instanceof HTMLElement) {
        newElement.style.pointerEvents = "none";
      }
    };
  }, [targetElement, elementClickable]);

  return (
    <div
      data-state={isVisible ? "open" : "closed"}
      className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 absolute inset-0 z-50 bg-black/50 mix-blend-hard-light data-[state=closed]:invisible data-[state=closed]:duration-500 data-[state=open]:duration-500"
    >
      <div
        className={cn(
          "fixed rounded-lg bg-[#808080] opacity-100",
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
