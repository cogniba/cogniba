"use client";

import { cn } from "@/lib/cn";
import sleep from "@/lib/sleep";
import { useEffect, useState } from "react";

export default function LandingPageBoard() {
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      while (true) {
        setSelectedSquare(null);
        await sleep(500);

        const newSelectedSquare = Math.floor(Math.random() * 8);
        setSelectedSquare(newSelectedSquare);
        await sleep(1000);
      }
    })();
  }, []);

  return (
    <div className="grid aspect-square w-full grid-cols-3 grid-rows-3 gap-1.5">
      {Array.from({ length: 9 }, (_, i) =>
        i === 4 ? (
          <div key={i} className="size-full bg-transparent"></div>
        ) : (
          <div key={i} className="size-full bg-background">
            <div
              className={cn(
                "size-full rounded-md border border-primary/70 bg-primary/60 transition duration-500",
                i - Number(i > 4) === selectedSquare && "bg-primary shadow-md",
              )}
            ></div>
          </div>
        ),
      )}
    </div>
  );
}
