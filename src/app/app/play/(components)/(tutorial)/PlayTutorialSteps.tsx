import PlayTutorialTooltip from "./PlayTutorialTooltip";

import Joyride, { ACTIONS, CallBackProps, EVENTS, Step } from "react-joyride";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Strong } from "@/components/Strong";

const getSteps = (boardSize: number, showSkipButton: boolean) => {
  const defaultStepProps = {
    isFixed: true,
    disableBeacon: true,
    data: {
      hideSkipButton: !showSkipButton,
    },
  };
  return [
    {
      ...defaultStepProps,
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
      placement: "center" as const,
      data: { hideBackButton: true, ...defaultStepProps.data },
    } satisfies Step,
    {
      ...defaultStepProps,
      title: <>3 important things</>,
      content: (
        <>
          There&apos;s <Strong>3 important things</Strong> you need to consider
          when playing the game: <Strong>the level</Strong>,{" "}
          <Strong>the board</Strong>, and <Strong>the button</Strong>.
        </>
      ),
      target: "body",
      placement: "center" as const,
    } satisfies Step,
    {
      ...defaultStepProps,
      title: <>The level</>,
      content: (
        <>
          This display shows <Strong>what level you&apos;re on</Strong>. The{" "}
          <Strong>higher</Strong> the level, the <Strong>harder</Strong> the
          game gets.
        </>
      ),
      target: "#level-display",
      placement: "bottom" as const,
    } satisfies Step,
    {
      ...defaultStepProps,
      title: <>The board</>,
      content: (
        <>
          <Strong>The board</Strong> is where you have to <Strong>focus</Strong>{" "}
          when playing. Squares <Strong>appear</Strong> every few seconds on{" "}
          <Strong>the board</Strong>.
        </>
      ),
      target: "#board",
      placement: "bottom" as const,
      offset: -boardSize / 2,
    } satisfies Step,
    {
      ...defaultStepProps,
      title: <>The button</>,
      content: (
        <>
          You will have to <Strong>press the button</Strong> when playing the
          game. You can either <Strong>click it</Strong> or{" "}
          <Strong>press the space bar</Strong>.
        </>
      ),
      target: "#button",
      placement: "top" as const,
    } satisfies Step,
    {
      ...defaultStepProps,
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
      target: "#board",
      placement: "bottom" as const,
      offset: -boardSize / 2,
    } satisfies Step,
    {
      ...defaultStepProps,
      title: <>Let&apos;s test your skills!</>,
      content: (
        <>
          Let&apos;s <Strong>play a game</Strong> to see if you understood the
          instructions. We will <Strong>help you</Strong> along the way.
        </>
      ),
      target: "body",
      placement: "center" as const,
      data: { primaryButtonText: "Play", ...defaultStepProps.data },
    } satisfies Step,
    {
      ...defaultStepProps,
      title: <>Press the button</>,
      content: (
        <>
          The square appeared <Strong>two consecutive times</Strong> on the{" "}
          <Strong>same spot</Strong> - <Strong>Press the button</Strong>.{" "}
        </>
      ),
      target: "#button",
      placement: "top" as const,
      spotlightClicks: true,
      data: {
        hidePrimaryButton: true,
        hideBackButton: true,
        ...defaultStepProps.data,
      },
    } satisfies Step,
    {
      ...defaultStepProps,
      title: <>Congratulations!</>,
      content: (
        <>
          You beat <Strong variant="orange">level 1</Strong>, you will now{" "}
          <Strong>advance</Strong> to <Strong variant="orange">level 2</Strong>!
        </>
      ),
      target: "body",
      placement: "center" as const,
      data: { hideBackButton: true, ...defaultStepProps.data },
    } satisfies Step,
    {
      ...defaultStepProps,
      title: <>How to play level 2</>,
      content: (
        <>
          You are now on <Strong variant="orange">level 2</Strong>, so you will
          have to <Strong>press the button</Strong> when the square appears{" "}
          <Strong>in the same spot as</Strong>{" "}
          <Strong variant="orange">2 steps</Strong> <Strong>before</Strong>.
        </>
      ),
      target: "#board",
      placement: "bottom" as const,
      offset: -boardSize / 2,
    } satisfies Step,
    {
      ...defaultStepProps,
      title: <>All you!</>,
      content: (
        <>
          We will <Strong>no longer help you</Strong>, but you will receive{" "}
          <Strong>feedback</Strong> while playing. <br />
          <br />
          <ul className="space-y-2.5">
            <li>
              If the screen turns <Strong variant="green">green</Strong>, it
              means you{" "}
              <Strong variant="green">pressed the button correctly</Strong>.
            </li>
            <li>
              If the screen turns <Strong variant="red">red</Strong>, it means
              you{" "}
              <Strong variant="red">
                you pressed the button, but you shouldn&apos;t have
              </Strong>
              .
            </li>
            <li>
              And if the screen turns <Strong variant="yellow">yellow</Strong>,
              it means you{" "}
              <Strong variant="yellow">
                should have pressed the button, but you didn&apos;t
              </Strong>
              .
            </li>
          </ul>
        </>
      ),
      target: "body",
      placement: "center" as const,
      data: { primaryButtonText: "Finish", ...defaultStepProps.data },
    } satisfies Step,
  ];
};

interface PlayTutorialStepsProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  isRunning: boolean;
  showSkipButton: boolean;
}

export default function PlayTutorialSteps({
  step,
  setStep,
  isRunning,
  showSkipButton,
}: PlayTutorialStepsProps) {
  const [loaded, setLoaded] = useState(false);
  const [boardSize, setBoardSize] = useState(0);

  const steps = useMemo(
    () => getSteps(boardSize, showSkipButton),
    [boardSize, showSkipButton],
  );

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { type, action } = data;

    if (type === EVENTS.STEP_AFTER) {
      setStep((step) => step + (action === ACTIONS.PREV ? -1 : 1));
    }
  };

  useEffect(() => {
    setBoardSize(document.getElementById("board")?.clientWidth || 0);
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <Joyride
      tooltipComponent={PlayTutorialTooltip}
      steps={steps}
      stepIndex={step}
      run={isRunning}
      callback={handleJoyrideCallback}
      disableCloseOnEsc={true}
      disableOverlayClose={true}
      disableScrolling={true}
      disableScrollParentFix={true}
      styles={{
        options: {
          arrowColor: "var(--slate-800)",
          zIndex: 50,
        },
      }}
    />
  );
}
