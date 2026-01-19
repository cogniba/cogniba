import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import GameWelcomeScreen from "./GameWelcomeScreen";
import GameStatsScreen from "./GameStatsScreen";
import { useGameContext } from "@/context/GameContext";
import { useAuthContext } from "@/context/AuthContext";
import UpgradeDialog from "@/components/UpgradeDialog";
import { LockIcon } from "lucide-react";
import subscriptionConfig from "@/config/subscriptionConfig";
import { cn } from "@/lib/cn";
import { usePostHog } from "posthog-js/react";

export default function GameStartScreen() {
  const posthog = usePostHog();
  const {
    isStartScreenVisible,
    correctHits,
    incorrectHits,
    missedHits,
    startPlaying,
    gamesPlayedToday,
  } = useGameContext();
  const { subscriptionType, status } = useAuthContext();
  const {
    limits: { dailyGamesLimit },
  } = subscriptionConfig;

  const isFreeUser = subscriptionType === "Free" || status === "loading";
  const hasReachedDailyLimit =
    gamesPlayedToday >= dailyGamesLimit && isFreeUser;

  const hasStatistics =
    correctHits !== null && incorrectHits !== null && missedHits !== null;

  return (
    <>
      <div
        data-state={isStartScreenVisible ? "open" : "closed"}
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 pointer-events-auto absolute inset-0 z-40 bg-black/80 backdrop-blur-sm data-[state=closed]:invisible data-[state=closed]:duration-500 data-[state=open]:duration-500"
      ></div>
      <Dialog defaultOpen open={isStartScreenVisible} modal={false}>
        <DialogContent
          className="absolute z-40 duration-500 data-[state=closed]:duration-500 data-[state=open]:duration-500 sm:max-w-lg"
          closeButton={false}
          hideOverlay
          aria-describedby={undefined}
          portal={false}
        >
          <div className="flex w-full max-w-lg flex-col justify-center">
            {!hasStatistics ? <GameWelcomeScreen /> : <GameStatsScreen />}

            <UpgradeDialog
              title="Daily games limit reached"
              description={`You've played ${String(dailyGamesLimit)} games today - you're doing great! Come back tomorrow to play more or upgrade to Pro to play unlimited games.`}
              active={hasReachedDailyLimit}
              asChild
            >
              <Button
                className={cn(
                  "xs:mt-14 xs:text-4xl pointer-events-auto relative mt-10 w-full cursor-pointer py-4 text-3xl font-bold tracking-wide uppercase transition duration-200 hover:shadow-lg active:shadow-sm xl:py-5 [&_svg]:size-7",
                  hasReachedDailyLimit && "opacity-50",
                )}
                size="custom"
                onClick={() => {
                  if (hasReachedDailyLimit) {
                    void posthog.capture("upgrade_dialog_open", {
                      source: "game_start_screen",
                    });
                    return;
                  }
                  void startPlaying();
                }}
                tabIndex={-1}
              >
                {hasReachedDailyLimit && (
                  <LockIcon className="absolute right-6" strokeWidth={2.4} />
                )}
                <span>Play</span>
              </Button>
            </UpgradeDialog>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
