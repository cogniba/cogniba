import Crosshair from "./Crosshair";
import Square from "./Square";

interface GameMainProps {
  selectedSquare: number | null;
}

export default function GameMain({ selectedSquare }: GameMainProps) {
  return (
    <div className="flex h-full w-full items-center justify-center [container-type:size]">
      <div className="grid h-[100cqmin] w-[100cqmin] grid-cols-3 grid-rows-3 gap-[2cqmin]">
        {Array.from({ length: 9 }, (_, i) =>
          i === 4 ? (
            <Crosshair key={i} />
          ) : (
            <Square key={i} selected={i - Number(i > 4) === selectedSquare} />
          ),
        )}
      </div>
    </div>
  );
}
