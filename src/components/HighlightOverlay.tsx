"use client";

import { useEffect, useRef } from "react";
import { Portal } from "./ui/Portal";

interface HighlightOverlayProps {
  elementId: string;
  padding?: number;
}

export default function HighlightOverlay({
  elementId,
  padding = 8,
}: HighlightOverlayProps) {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    elementRef.current = null;

    const element = document.getElementById(elementId);
    if (element) {
      elementRef.current = element;
    }
  }, [elementId]);

  console.log(elementRef.current);

  if (!elementRef.current) {
    return null;
  }

  const { height, width, top, left } =
    elementRef.current.getBoundingClientRect();

  return (
    <Portal asChild>
      <div className="fixed left-0 top-0 z-50 h-screen w-screen mix-blend-hard-light dark:bg-black/50">
        <div
          className="absolute h-96 w-96 rounded-lg bg-[#808080]"
          style={{
            height: height + padding * 2,
            width: width + padding * 2,
            top: top - padding,
            left: left - padding,
          }}
        ></div>
      </div>
    </Portal>
  );
}
