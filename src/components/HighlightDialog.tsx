"use client";

import { useCallback, useState } from "react";
import HighlightOverlay from "./HighlightOverlay";
import { Dialog, DialogContent } from "./ui/dialog";
import useElementDimensions from "@/hooks/useElementDimensions";
import { cn } from "@/lib/cn";
import HighlightDialogArrow from "./HighlightDialogArrow";

export type PlacementType =
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
  const { height, width, top, left } = elementDimensions ?? {
    height: 0,
    width: 0,
    top: 0,
    left: 0,
  };

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
      <DialogContent asChild hideOverlay>
        <div
          className={cn(
            "fixed left-1/2 top-auto z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 transition-all duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            (placement === "top" || placement === "center-top") &&
              "-translate-y-full",
            (placement === "bottom" || placement === "center-bottom") &&
              "translate-y-0",
            placement === "center" && "top-1/2",
          )}
          style={styles[placement]}
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
                "absolute left-1/2 top-0 -z-10 -translate-x-1/2 drop-shadow-xl",
                (placement === "top" || placement === "center-top") &&
                  "top-full",
                (placement === "bottom" || placement === "center-bottom") &&
                  "-translate-y-full",
              )}
            />
          )}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
