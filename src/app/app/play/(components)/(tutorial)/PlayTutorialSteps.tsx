import { type Dispatch, type SetStateAction, useCallback } from "react";
import { Strong } from "@/components/ui/Strong";
import HighlightDialog, {
  type PlacementType,
} from "@/components/HighlightDialog";
import PlayTutorialTooltip from "./PlayTutorialTooltip";
import { useSession } from "next-auth/react";
import finishTutorial from "@/server-actions/finishTutorial";

type StepType = {
  title: React.ReactNode;
  content: React.ReactNode;
  target: string;
  placement: PlacementType;
  hideBackButton?: boolean;
  hidePrimaryButton?: boolean;
  primaryButtonText?: string;
};

const steps = [
  {
    title: (
      <>
        Welcome to <Strong variant="orange">cogniaprendo</Strong>!
      </>
    ),
    content: (
      <>
        In this quick tutorial you will learn{" "}
        <Strong>how to play the game</Strong>.
      </>
    ),
    target: "body",
    placement: "center",
    hideBackButton: true,
  },
  {
    title: <>3 important things</>,
    content: (
      <>
        There&apos;s <Strong>3 important things</Strong> you need to consider
        when playing the game: <Strong>the level</Strong>,{" "}
        <Strong>the board</Strong>, and <Strong>the button</Strong>.
      </>
    ),
    target: "body",
    placement: "center",
  },
  {
    title: <>The level</>,
    content: (
      <>
        This display shows <Strong>what level you&apos;re on</Strong>. The{" "}
        <Strong>higher</Strong> the level, the <Strong>harder</Strong> the game
        gets.
      </>
    ),
    target: "#game-level-display",
    placement: "bottom",
  },
  {
    title: <>The board</>,
    content: (
      <>
        <Strong>The board</Strong> is where you have to <Strong>focus</Strong>{" "}
        when playing. Squares <Strong>appear</Strong> every few seconds on{" "}
        <Strong>the board</Strong>.
      </>
    ),
    target: "#game-board",
    placement: "center-top",
  },
  {
    title: <>The button</>,
    content: (
      <>
        You will have to <Strong>press the button</Strong> when playing the
        game. You can either <Strong>click it</Strong> or{" "}
        <Strong>press the space bar</Strong>.
      </>
    ),
    target: "#game-button",
    placement: "top",
  },
  {
    title: <>How to play</>,
    content: (
      <>
        You are on <Strong variant="orange">level 1</Strong>, so you have to{" "}
        <Strong>press the button</Strong> when the square appears{" "}
        <Strong>in the same spot as</Strong>{" "}
        <Strong variant="orange">1 step</Strong> <Strong>before</Strong>. In
        other words, <Strong>press the button</Strong> when the square appears{" "}
        <Strong>two consecutive times</Strong> on the same spot.
      </>
    ),
    target: "#game-board",
    placement: "center-top",
  },
  {
    title: <>Let&apos;s test your skills!</>,
    content: (
      <>
        Let&apos;s <Strong>play a game</Strong> to see if you understood the
        instructions. We will <Strong>help you</Strong> along the way.
      </>
    ),
    target: "body",
    placement: "center",
    primaryButtonText: "Play",
  },
  {
    title: <>Press the button</>,
    content: (
      <>
        The square appeared <Strong>two consecutive times</Strong> on the{" "}
        <Strong>same spot</Strong> - <Strong>Press the button</Strong>.{" "}
      </>
    ),
    target: "#game-button",
    placement: "top",
    // TODO
    // spotlightClicks: true,
    hidePrimaryButton: true,
    hideBackButton: true,
  },
  {
    title: <>Congratulations!</>,
    content: (
      <>
        You beat <Strong variant="orange">level 1</Strong>, you will now{" "}
        <Strong>advance</Strong> to <Strong variant="orange">level 2</Strong>!
      </>
    ),
    target: "body",
    placement: "center",
    hideBackButton: true,
  },
  {
    title: <>How to play level 2</>,
    content: (
      <>
        You are now on <Strong variant="orange">level 2</Strong>, so you will
        have to <Strong>press the button</Strong> when the square appears{" "}
        <Strong>in the same spot as</Strong>{" "}
        <Strong variant="orange">2 steps</Strong> <Strong>before</Strong>.
      </>
    ),
    target: "#game-board",
    placement: "center-top",
  },
  {
    title: <>All you!</>,
    content: (
      <>
        We will <Strong>no longer help you</Strong>, but you will receive{" "}
        <Strong>feedback</Strong> while playing. <br />
        <br />
        <ul className="space-y-2.5">
          <li>
            If the screen turns <Strong variant="green">green</Strong>, it means
            you <Strong variant="green">pressed the button correctly</Strong>.
          </li>
          <li>
            If the screen turns <Strong variant="red">red</Strong>, it means you{" "}
            <Strong variant="red">
              you pressed the button, but you shouldn&apos;t have
            </Strong>
            .
          </li>
          <li>
            And if the screen turns <Strong variant="yellow">yellow</Strong>, it
            means you{" "}
            <Strong variant="yellow">
              should have pressed the button, but you didn&apos;t
            </Strong>
            .
          </li>
        </ul>
      </>
    ),
    target: "body",
    placement: "center",
    primaryButtonText: "Finish",
  },
] satisfies StepType[];

interface PlayTutorialStepsProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  isVisible: boolean;
  showSkipButton: boolean;
}

export default function PlayTutorialSteps({
  step,
  setStep,
  isVisible,
  showSkipButton,
}: PlayTutorialStepsProps) {
  const { update: updateSession } = useSession();

  const handleSkip = useCallback(async () => {
    await updateSession({ hasFinishedTutorial: true });
    await finishTutorial();
  }, [updateSession]);

  return (
    <HighlightDialog
      placement={steps[step].placement}
      targetElement={steps[step].target}
    >
      <PlayTutorialTooltip
        title={steps[step].title}
        content={steps[step].content}
        showSkipButton={showSkipButton && step === 0}
        hideBackButton={steps[step].hideBackButton}
        hidePrimaryButton={steps[step].hidePrimaryButton}
        primaryButtonText={steps[step].primaryButtonText}
        handlePrimaryButtonClick={() => setStep((prevStep) => prevStep + 1)}
        handleBackButtonClick={() => setStep((prevStep) => prevStep - 1)}
        handleSkipButtonClick={handleSkip}
      />
    </HighlightDialog>
  );
}
