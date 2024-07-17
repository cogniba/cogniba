import Game from "@/components/Game";
import SpaceBar from "@/components/SpaceBar";

export default function PlayPage() {
  return (
    <div className="flex h-full items-center justify-center bg-red-500">
      <div className="flex h-full w-[50rem] flex-col items-center bg-blue-500">
        <div className="h-full w-full bg-pink-500">
          <Game />
        </div>
        <div className="h-44 w-full flex-shrink-0">
          <SpaceBar />
        </div>
      </div>
    </div>
  );
}
