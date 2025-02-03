import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import GameWelcomeScreen from "./GameWelcomeScreen";
import GameStatsScreen from "./GameStatsScreen";
import { useGameContext } from "@/context/GameContext";

export default function GameStartScreen() {
  const {
    isStartScreenVisible,
    correctHits,
    incorrectHits,
    missedHits,
    startPlaying,
  } = useGameContext();

  const hasStatistics =
    correctHits !== null && incorrectHits !== null && missedHits !== null;

  return (
    <>
      <div
        data-state={isStartScreenVisible ? "open" : "closed"}
        className="pointer-events-auto absolute inset-0 z-40 bg-black/80 backdrop-blur-sm data-[state=closed]:invisible data-[state=closed]:duration-500 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      ></div>
      <Dialog defaultOpen open={isStartScreenVisible} modal={false}>
        <DialogContent
          className="absolute z-40 duration-500 data-[state=closed]:duration-500 data-[state=open]:duration-500 sm:max-w-lg"
          closeButton={false}
          hideOverlay
        >
          <div className="flex w-full max-w-lg flex-col justify-center">
            {!hasStatistics ? <GameWelcomeScreen /> : <GameStatsScreen />}
            <Button
              className="mt-10 py-4 text-3xl font-bold uppercase tracking-wide transition duration-200 hover:shadow-lg active:shadow-sm xs:mt-14 xs:text-4xl xl:py-5"
              size="custom"
              type="submit"
              onClick={startPlaying}
              tabIndex={-1}
            >
              Play
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
