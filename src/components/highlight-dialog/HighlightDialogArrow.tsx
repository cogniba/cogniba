import { cn } from "@/lib/cn";
import { forwardRef } from "react";

interface HighlightDialogArrowProps {
  className?: string;
  style?: React.CSSProperties;
  type: "top" | "bottom" | "left" | "right";
}

const HighlightDialogArrow = forwardRef<
  HTMLDivElement,
  HighlightDialogArrowProps
>(({ className, style, type }, ref) => {
  return (
    <div ref={ref} className={className} style={style}>
      <div
        className={cn(
          "h-0 w-0 border-[1rem] border-transparent",
          type === "top" && "border-t-0 border-b-background",
          type === "bottom" && "border-b-0 border-t-background",
          type === "left" && "border-l-0 border-r-background",
          type === "right" && "border-r-0 border-l-background",
        )}
      ></div>
    </div>
  );
});
HighlightDialogArrow.displayName = "HighlightDialogArrow";

export default HighlightDialogArrow;
