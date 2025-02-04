import LoaderWrapper from "@/components/LoaderWrapper";
import { Strong } from "@/components/ui/Strong";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGameTutorialContext } from "@/context/GameTutorialContext";

interface GameTutorialTooltipProps {
  showSkipButton: boolean;
}

export default function GameTutorialTooltip({
  showSkipButton,
}: GameTutorialTooltipProps) {
  const { steps, step, setStep, isLoading, handleFinishTutorial } =
    useGameTutorialContext();

  const currentStep = steps[step - Number(step >= steps.length)];
  const skipButton = showSkipButton && step === 0;

  return (
    <>
      <DialogHeader className="pb-1">
        <DialogTitle className="text-2xl font-semibold">
          {currentStep.title}
        </DialogTitle>
      </DialogHeader>
      <div className="pb-2.5 text-secondary-foreground">
        {currentStep.content}
      </div>
      <DialogFooter className="flex flex-row items-center justify-between sm:justify-between">
        {skipButton ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" disabled={isLoading}>
                Skip
              </Button>
            </AlertDialogTrigger>
            <AlertDialogOverlay className="z-[1000]" />
            <AlertDialogContent className="z-[1000]">
              <DialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-secondary-foreground">
                  If you <Strong>skip</Strong> the tutorial you{" "}
                  <Strong>won&apos;t be able to see it again</Strong>. Only{" "}
                  <Strong>skip</Strong> if you{" "}
                  <Strong>already know how to play</Strong>.
                </AlertDialogDescription>
              </DialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    handleFinishTutorial();
                  }}
                >
                  <LoaderWrapper loading={isLoading}>Skip</LoaderWrapper>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <span></span>
        )}
        <div className="flex items-center justify-end gap-4">
          {!currentStep.hideBackButton && (
            <Button
              variant="secondary"
              onClick={() => setStep((prevStep) => prevStep - 1)}
              disabled={isLoading}
            >
              Back
            </Button>
          )}
          {!currentStep.hidePrimaryButton && (
            <Button
              onClick={() => setStep((prevStep) => prevStep + 1)}
              disabled={isLoading}
            >
              <LoaderWrapper loading={isLoading}>
                {currentStep.primaryButtonText}
              </LoaderWrapper>
            </Button>
          )}
        </div>
      </DialogFooter>
    </>
  );
}
