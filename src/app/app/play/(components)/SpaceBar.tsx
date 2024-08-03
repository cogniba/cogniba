import { cn } from "@/lib/cn";
import sleep from "@/lib/sleep";
import { useCallback, useEffect, useState } from "react";

interface SpaceBarProps {
  hasPressedSpaceBar: React.MutableRefObject<boolean>;
  handleShowFeedback: () => void;
}

export default function SpaceBar({
  hasPressedSpaceBar,
  handleShowFeedback,
}: SpaceBarProps) {
  const [isSpaceBarPressed, setIsSpaceBarPressed] = useState(false);

  const handleSpaceBarPress = useCallback(async () => {
    if (!hasPressedSpaceBar.current) {
      hasPressedSpaceBar.current = true;
      setIsSpaceBarPressed(true);
      handleShowFeedback();
      await sleep(400);
      setIsSpaceBarPressed(false);
    }
  }, [hasPressedSpaceBar, handleShowFeedback]);

  useEffect(() => {
    addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        handleSpaceBarPress();
      }
    });
  }, [handleSpaceBarPress]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <button
        className={cn(
          "h-full w-full -translate-y-1 rounded-md border border-orange-400/50 bg-orange-300 shadow-2xl outline-none transition duration-300 dark:border-orange-700 dark:bg-orange-800",
          isSpaceBarPressed &&
            "translate-y-0 border-orange-500/50 bg-orange-400 shadow-sm dark:border-orange-600 dark:bg-orange-700",
        )}
        tabIndex={-1}
        onPointerDown={handleSpaceBarPress}
      ></button>
    </div>
  );
}
