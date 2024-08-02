import { cn } from "@/lib/cn";
import sleep from "@/lib/sleep";
import { useCallback, useEffect, useState } from "react";

interface SpaceBarProps {
  hasPressedSpaceBar: React.MutableRefObject<boolean>;
}

export default function SpaceBar({ hasPressedSpaceBar }: SpaceBarProps) {
  const [isSpaceBarPressed, setIsSpaceBarPressed] = useState(false);

  const handleSpaceBarPress = useCallback(async () => {
    if (!hasPressedSpaceBar.current) {
      hasPressedSpaceBar.current = true;
      setIsSpaceBarPressed(true);
      await sleep(400);
      setIsSpaceBarPressed(false);
    }
  }, [hasPressedSpaceBar]);

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
          "h-full w-full -translate-y-1 rounded-md border border-orange-400/50 bg-orange-300 shadow-2xl outline-none transition duration-300 dark:border-orange-800 dark:bg-orange-900",
          isSpaceBarPressed &&
            "translate-y-0 border-orange-500/50 bg-orange-400 shadow-sm dark:border-orange-700 dark:bg-orange-800",
        )}
        tabIndex={-1}
        onPointerDown={handleSpaceBarPress}
      ></button>
    </div>
  );
}
