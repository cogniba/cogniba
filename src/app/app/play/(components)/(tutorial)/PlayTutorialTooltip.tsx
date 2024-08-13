import finishTutorial from "@/server-actions/finishTutorial";

import { Strong } from "@/components/Strong";
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
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

import type { TooltipRenderProps } from "react-joyride";

export default function PlayTutorialTooltip({
  step,
  index,
  primaryProps,
  backProps,
}: TooltipRenderProps) {
  const { update: updateSession } = useSession();

  const handleSkip = useCallback(async () => {
    await updateSession({ hasFinishedTutorial: true });
    await finishTutorial();
  }, [updateSession]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{step.title}</CardTitle>
      </CardHeader>
      <CardContent className="max-w-md text-slate-700 dark:text-slate-300">
        {step.content}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        {!step.data?.hideSkipButton && index === 0 ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Skip</Button>
            </AlertDialogTrigger>
            <AlertDialogOverlay className="z-[1000]" />
            <AlertDialogContent className="z-[1000]">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className="dark:text-slate-300">
                  If you <Strong>skip</Strong> the tutorial you{" "}
                  <Strong>won&apos;t be able to see it again</Strong>. Only{" "}
                  <Strong>skip</Strong> if you{" "}
                  <Strong>already know how to play</Strong>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className={buttonVariants({ variant: "orange" })}
                  onClick={handleSkip}
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
          {!step.data?.hideBackButton && (
            <Button
              {...backProps}
              variant="secondary"
              aria-label="Back"
              data-action="Back"
              title="Back"
            >
              Back
            </Button>
          )}
          {!step.data?.hidePrimaryButton && (
            <Button
              {...primaryProps}
              variant="orange"
              aria-label={step.data?.primaryButtonText || "Next"}
              data-action={step.data?.primaryButtonText || "Next"}
              title={step.data?.primaryButtonText || "Next"}
            >
              {step.data?.primaryButtonText || "Next"}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
