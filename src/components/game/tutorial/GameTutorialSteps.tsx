import HighlightDialog from "@/components/highlight-dialog/HighlightDialog";
import GameTutorialTooltip from "./GameTutorialTooltip";
import { useGameTutorialContext } from "@/context/GameTutorialContext";

interface GameTutorialStepsProps {
  showSkipButton: boolean;
}

export default function GameTutorialSteps({
  showSkipButton,
}: GameTutorialStepsProps) {
  const { steps, step, isVisible } = useGameTutorialContext();

  const currentStep = steps[step - Number(step >= steps.length)];

  return (
    <HighlightDialog
      isOpen={step >= steps.length ? false : isVisible}
      placement={currentStep.placement}
      elementClickable={currentStep.elementClickable}
      targetElement={currentStep.target}
    >
      <GameTutorialTooltip showSkipButton={showSkipButton} />
    </HighlightDialog>
  );
}
