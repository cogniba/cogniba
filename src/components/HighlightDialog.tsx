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

  const styles = {
    top: { top: top - arrowHeight },
    "center-top": { top: top + height / 2 - arrowHeight },
    bottom: { top: top + height + arrowHeight },
    "center-bottom": { top: top + height / 2 + arrowHeight },
    center: {},
  };

  return (
    <Dialog open={isOpen}>
      <HighlightOverlay targetElement={targetElement} />
      <DialogContent
        className={cn(
          "top-auto z-50",
          (placement === "top" || placement === "center-top") &&
            "-translate-y-full",
          (placement === "bottom" || placement === "center-bottom") &&
            "translate-y-0",
          placement === "center" && "top-1/2",
        )}
        style={styles[placement]}
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
              "absolute left-1/2 top-0 -z-10 -translate-x-1/2",
              (placement === "top" || placement === "center-top") && "top-full",
              (placement === "bottom" || placement === "center-bottom") &&
                "-translate-y-full",
            )}
          />
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}
