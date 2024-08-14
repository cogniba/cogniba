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
          "h-0 w-0 border-[1.5rem] border-transparent",
          type === "top" && "border-t-0 border-b-white",
          type === "bottom" && "border-b-0 border-t-white",
          type === "left" && "border-l-0 border-r-white",
          type === "right" && "border-r-0 border-l-white",
        )}
      ></div>
    </div>
  );
});
HighlightDialogArrow.displayName = "HighlightDialogArrow";

export default HighlightDialogArrow;
