"use client";

import useElementDimensions from "@/hooks/useElementDimensions";
import { cn } from "@/lib/cn";
import { useEffect, useRef } from "react";

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

  const elementDimensions = useElementDimensions(
    targetElement === "body" ? previousTargetElementRef.current : targetElement,
    padding,
  );
  const { height, width, top, left, element } = elementDimensions ?? {
    height: 0,
    width: 0,
    top: 0,
    left: 0,
    element: null,
  };

  if (currentTargetElementRef.current !== targetElement) {
    previousTargetElementRef.current = currentTargetElementRef.current;
    currentTargetElementRef.current = targetElement;
  }

  useEffect(() => {
    if (!elementClickable) return;

    if (element instanceof HTMLElement) {
      element.style.pointerEvents = "none";
    }

    const newElement = document.querySelector(targetElement);

    if (newElement instanceof HTMLElement && targetElement !== "body") {
      console.log(newElement);
      newElement.style.pointerEvents = "auto";
    }
  }, [targetElement, element, elementClickable]);

  return (
    <div
      data-state={isVisible ? "open" : "closed"}
      className="fixed inset-0 z-50 bg-black/50 mix-blend-hard-light data-[state=closed]:invisible data-[state=closed]:duration-500 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    >
      <div
        className={cn(
          "pointer-events-none absolute rounded-lg bg-[#808080] opacity-100",
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
