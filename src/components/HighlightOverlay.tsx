"use client";

import useElementDimensions from "@/hooks/useElementDimensions";

interface HighlightOverlayProps {
  targetElement: string;
  padding?: number;
}

export default function HighlightOverlay({
  targetElement,
  padding = 8,
}: HighlightOverlayProps) {
  const elementDimensions = useElementDimensions(targetElement);
  if (!elementDimensions) {
    return null;
  }

  const { height, width, top, left } = elementDimensions;

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-black/50 mix-blend-hard-light">
      {targetElement !== "body" && (
        <div
          className="absolute rounded-lg bg-[#808080]"
          style={{
            height,
            width,
            top,
            left,
          }}
        ></div>
      )}
    </div>
  );
}
