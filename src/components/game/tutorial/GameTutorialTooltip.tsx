import { Strong } from "@/components/ui/Strong";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
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

interface GameTutorialTooltipProps {
  title: React.ReactNode;
  content: React.ReactNode;
  showSkipButton?: boolean;
  hideBackButton?: boolean;
  hidePrimaryButton?: boolean;
  primaryButtonText?: string;

  handlePrimaryButtonClick: () => void;
  handleBackButtonClick: () => void;
  handleSkipButtonClick: () => void;
}

export default function GameTutorialTooltip({
  title,
  content,
  showSkipButton = false,
  hideBackButton = false,
  hidePrimaryButton = false,
  primaryButtonText = "Next",

  handlePrimaryButtonClick,
  handleBackButtonClick,
  handleSkipButtonClick,
}: GameTutorialTooltipProps) {
  return (
    <>
      <DialogHeader className="pb-1">
        <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
      </DialogHeader>
      <div className="text-md pb-2.5 text-slate-700 dark:text-slate-300">
        {content}
      </div>
      <DialogFooter className="sm:justify-between flex flex-row items-center justify-between">
        {showSkipButton ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Skip</Button>
            </AlertDialogTrigger>
            <AlertDialogOverlay className="z-[1000]" />
            <AlertDialogContent className="z-[1000]">
              <DialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className="dark:text-slate-300">
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
                  // className={buttonVariants({ variant: "orange" })}
                  onClick={handleSkipButtonClick}
                >
                  Skip
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <span></span>
        )}
        <div className="flex items-center justify-end gap-4">
          {!hideBackButton && (
            <Button variant="secondary" onClick={handleBackButtonClick}>
              Back
            </Button>
          )}
          {!hidePrimaryButton && (
            <Button onClick={handlePrimaryButtonClick}>
              {primaryButtonText}
            </Button>
          )}
        </div>
      </DialogFooter>
    </>
  );
}
