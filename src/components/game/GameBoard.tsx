import GameCrosshair from "./GameCrosshair";
import GameSquare from "./GameSquare";

interface BoardProps {
  selectedSquare: number | null;
}

export default function Board({ selectedSquare }: BoardProps) {
  return (
    <div className="flex h-full w-full items-center justify-center [container-type:size]">
      <div
        className="grid h-[100cqmin] w-[100cqmin] grid-cols-3 grid-rows-3 gap-[2cqmin]"
        id="game-board"
      >
        {Array.from({ length: 9 }, (_, i) =>
          i === 4 ? (
            <GameCrosshair key={i} />
          ) : (
            <GameSquare
              key={i}
              selected={i - Number(i > 4) === selectedSquare}
            />
          ),
        )}
      </div>
    </div>
  );
}
