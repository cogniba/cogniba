import { cn } from "@/lib/cn";
import { forwardRef } from "react";

type HighlightDialogArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  type: "top" | "bottom" | "left" | "right";
};

const HighlightDialogArrow = forwardRef<
  HTMLDivElement,
  HighlightDialogArrowProps
>(({ className, style, type }, ref) => {
  return (
    <div ref={ref} className={className} style={style}>
      <div
        className={cn(
          "h-0 w-0 border-[1rem] border-transparent",
          type === "top" && "border-b-background border-t-0",
          type === "bottom" && "border-t-background border-b-0",
          type === "left" && "border-r-background border-l-0",
          type === "right" && "border-l-background border-r-0",
        )}
      ></div>
    </div>
  );
});
HighlightDialogArrow.displayName = "HighlightDialogArrow";

export default HighlightDialogArrow;
