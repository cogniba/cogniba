import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import GameWelcomeScreen from "./GameWelcomeScreen";
import GameStatsScreen from "./GameStatsScreen";

interface GameStartScreenProps {
  visible: boolean;
  onStart: () => void;
  correctHits: number | null;
  incorrectHits: number | null;
  missedHits: number | null;
  previousLevel: number;
  newLevel: number;
}

export default function GameStartScreen({
  visible,
  onStart,
  correctHits,
  incorrectHits,
  missedHits,
  previousLevel,
  newLevel,
}: GameStartScreenProps) {
  const hasStatistics =
    correctHits !== null && incorrectHits !== null && missedHits !== null;

  return (
    <>
      <div
        data-state={visible ? "open" : "closed"}
        className="pointer-events-auto absolute inset-0 z-40 bg-black/80 backdrop-blur-sm data-[state=closed]:invisible data-[state=closed]:duration-500 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      ></div>
      <Dialog defaultOpen open={visible} modal={false}>
        <DialogContent
          className="absolute z-40 duration-500 data-[state=closed]:duration-500 data-[state=open]:duration-500 sm:max-w-lg"
          closeButton={false}
          hideOverlay
        >
          <div className="flex w-full max-w-lg flex-col justify-center">
            {!hasStatistics ? (
              <GameWelcomeScreen />
            ) : (
              <GameStatsScreen
                correctHits={correctHits}
                incorrectHits={incorrectHits}
                missedHits={missedHits}
                newLevel={newLevel}
                previousLevel={previousLevel}
              />
            )}
            <Button
              className="mt-10 py-4 text-3xl font-bold uppercase tracking-wide transition duration-200 hover:shadow-lg active:shadow-sm xs:mt-14 xs:text-4xl xl:py-5"
              size="custom"
              type="submit"
              onClick={onStart}
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
