"use client";

import { useCallback, useState } from "react";
import HighlightOverlay from "./HighlightOverlay";
import { Dialog, DialogContent } from "./ui/dialog";
import useElementDimensions from "@/hooks/useElementDimensions";
import { cn } from "@/lib/cn";
import HighlightDialogArrow from "./HighlightDialogArrow";

type PlacementType =
  | "top"
  | "bottom"
  | "center-top"
  | "center-bottom"
  | "center";

interface HighlightDialogProps {
  targetElement?: string;
  placement: PlacementType;
  children: React.ReactNode;
}

export default function HighlightDialog({
  targetElement = "body",
  placement,
  children,
}: HighlightDialogProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [arrowHeight, setArrowHeight] = useState<number>(0);

  const arrowRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      setArrowHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const elementDimensions = useElementDimensions(targetElement);

  if (!elementDimensions) {
    return null;
  }

  const { height, width, top, left } = elementDimensions;

  return (
    <Dialog open={isOpen}>
      <HighlightOverlay targetElement={targetElement} />
      <DialogContent
        className={cn(
          "z-50",
          placement === "top" && "top-auto -translate-y-full",
        )}
        style={placement === "top" ? { top: top - arrowHeight } : {}}
        closeButton={false}
        hideOverlay
      >
        {placement !== "center" && (
          <HighlightDialogArrow
            ref={arrowRef}
            type={
              placement === "top" || placement === "center-top"
                ? "bottom"
                : "top"
            }
            className={cn(
              "absolute left-1/2 top-0 -translate-x-1/2",
              placement === "top" && "top-full",
            )}
          />
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}
