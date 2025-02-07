import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import GameWelcomeScreen from "./GameWelcomeScreen";
import GameStatsScreen from "./GameStatsScreen";
import { useGameContext } from "@/context/GameContext";
import { useAuthContext } from "@/context/AuthContext";
import gameConfig from "@/config/gameConfig";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { SparklesIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export default function GameStartScreen() {
  const {
    isStartScreenVisible,
    correctHits,
    incorrectHits,
    missedHits,
    startPlaying,
    gamesPlayedToday,
  } = useGameContext();
  const { subscriptionType } = useAuthContext();
  const {
    parameters: { dailyGamesLimit },
  } = gameConfig;

  const isFreeUser = subscriptionType === "Free";
  const hasReachedDailyLimit =
    gamesPlayedToday >= dailyGamesLimit && isFreeUser;

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
          aria-describedby={undefined}
        >
          <div className="flex w-full max-w-lg flex-col justify-center">
            {!hasStatistics ? <GameWelcomeScreen /> : <GameStatsScreen />}
            <HoverCard openDelay={50} closeDelay={50}>
              <HoverCardTrigger className="group mt-10 xs:mt-14">
                <Button
                  className="relative w-full py-4 text-3xl font-bold uppercase tracking-wide transition duration-200 hover:shadow-lg active:shadow-sm disabled:pointer-events-auto disabled:hover:cursor-not-allowed xs:text-4xl xl:py-5"
                  size="custom"
                  type="submit"
                  onClick={startPlaying}
                  tabIndex={-1}
                  disabled={hasReachedDailyLimit}
                >
                  Play
                </Button>
              </HoverCardTrigger>
              <HoverCardContent
                side="top"
                className={cn(
                  "hidden w-full max-w-md",
                  hasReachedDailyLimit && "block",
                )}
                sideOffset={10}
              >
                <div className="mb-2 text-xl font-semibold">
                  Daily games limit reached
                </div>
                <div className="mb-6 text-sm text-foreground/85">
                  You&apos;ve played {dailyGamesLimit} games today - you&apos;re
                  doing great! Come back tomorrow to play more or upgrade to Pro
                  to play unlimited games.
                </div>
                <Link href="/app/upgrade">
                  <Button className="w-full">
                    <SparklesIcon />
                    <span>Upgrade to Pro</span>
                  </Button>
                </Link>
              </HoverCardContent>
            </HoverCard>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
