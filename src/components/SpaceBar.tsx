import { cn } from "@/lib/utils";
import sleep from "@/utils/sleep";
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
      await sleep(300);
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
    <div className="flex h-full w-full items-center justify-center bg-green-500 px-2 py-8">
      <button
        className={cn(
          "h-full w-full bg-white",
          isSpaceBarPressed && "bg-green-300",
        )}
        onClick={handleSpaceBarPress}
      ></button>
    </div>
  );
}
