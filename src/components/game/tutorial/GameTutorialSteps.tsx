import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useTransition,
} from "react";
import HighlightDialog, {
  type PlacementType,
} from "@/components/highlight-dialog/HighlightDialog";
import GameTutorialTooltip from "./GameTutorialTooltip";
import { useToast } from "@/hooks/use-toast";
import { useGameContext } from "@/context/GameContext";

export type StepType = {
  title: React.ReactNode;
  content: React.ReactNode;
  target: string;
  placement: PlacementType;
  hideBackButton?: boolean;
  hidePrimaryButton?: boolean;
  primaryButtonText?: string;
  elementClickable?: boolean;
};

interface GameTutorialStepsProps {
  steps: StepType[];
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  isVisible: boolean;
  showSkipButton: boolean;
  isLoading?: boolean;
}

export default function GameTutorialSteps({
  steps,
  step,
  setStep,
  isVisible,
  showSkipButton,
  isLoading,
}: GameTutorialStepsProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { setIsTutorial, setShowTutorial } = useGameContext();

  const handleSkip = useCallback(async () => {
    startTransition(async () => {
      const response = await fetch("/api/user/update-user", {
        method: "POST",
        body: JSON.stringify({ hasFinishedTutorial: true }),
      });

      if (!response.ok) {
        toast({ title: "Unexpected error occurred", variant: "destructive" });
      } else {
        setIsTutorial(false);
        setShowTutorial(false);
      }
    });
  }, [setIsTutorial, setShowTutorial, toast]);

  const currentStep = steps[step - Number(step >= steps.length)];
  return (
    <HighlightDialog
      isOpen={step >= steps.length ? false : isVisible}
      placement={currentStep.placement}
      elementClickable={currentStep.elementClickable}
      targetElement={currentStep.target}
    >
      <GameTutorialTooltip
        title={currentStep.title}
        content={currentStep.content}
        showSkipButton={showSkipButton && step === 0}
        hideBackButton={currentStep.hideBackButton}
        hidePrimaryButton={currentStep.hidePrimaryButton}
        primaryButtonText={currentStep.primaryButtonText}
        isLoading={isLoading || isPending}
        handlePrimaryButtonClick={() => setStep((prevStep) => prevStep + 1)}
        handleBackButtonClick={() => setStep((prevStep) => prevStep - 1)}
        handleSkipButtonClick={handleSkip}
      />
    </HighlightDialog>
  );
}
