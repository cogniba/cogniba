import Joyride, { ACTIONS, CallBackProps, EVENTS, Step } from "react-joyride";
import PlayTutorialTooltip from "./PlayTutorialTooltip";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const defaultStepProps = {
  isFixed: true,
  disableBeacon: true,
};

const getSteps = (boardSize: number) => [
  {
    title: (
      <>
        Welcome to <span className="text-orange-500">cogniaprendo</span>!
      </>
    ),
    content: (
      <>
        In this quick tutorial you will learn{" "}
        <strong className="font-semibold text-slate-50">
          how to play the game
        </strong>
        .
      </>
    ),
    target: "body",
    placement: "center" as const,
    ...defaultStepProps,
  } satisfies Step,
  {
    title: <>3 important things</>,
    content: (
      <>
        There&apos;s{" "}
        <strong className="font-semibold text-slate-50">
          3 important things
        </strong>{" "}
        you need to consider when playing the game:{" "}
        <strong className="font-semibold text-slate-50">the level</strong>,{" "}
        <strong className="font-semibold text-slate-50">the board</strong>, and{" "}
        <strong className="font-semibold text-slate-50">the button</strong>.
      </>
    ),
    target: "body",
    placement: "center" as const,
    ...defaultStepProps,
  } satisfies Step,
  {
    title: <>The level</>,
    content: (
      <>
        This display shows{" "}
        <strong className="font-semibold text-slate-50">
          what level you&apos;re on
        </strong>
        . The <strong className="font-semibold text-slate-50">higher</strong>{" "}
        the level, the{" "}
        <strong className="font-semibold text-slate-50">harder</strong> the game
        gets.
      </>
    ),
    target: "#level-display",
    placement: "bottom" as const,
    ...defaultStepProps,
  } satisfies Step,
  {
    title: <>The board</>,
    content: (
      <>
        <strong className="font-semibold text-slate-50">The board</strong> is
        where you have to{" "}
        <strong className="font-semibold text-slate-50">focus</strong> when
        playing. Squares{" "}
        <strong className="font-semibold text-slate-50">appear</strong> every
        few seconds on{" "}
        <strong className="font-semibold text-slate-50">the board</strong>.
      </>
    ),
    target: "#board",
    placement: "bottom" as const,
    offset: -boardSize / 2,
    ...defaultStepProps,
  } satisfies Step,
  {
    title: <>The button</>,
    content: (
      <>
        You will have to{" "}
        <strong className="font-semibold text-slate-50">
          press the button
        </strong>{" "}
        when playing the game. You can either{" "}
        <strong className="font-semibold text-slate-50">click it</strong> or{" "}
        <strong className="font-semibold text-slate-50">
          press the space bar
        </strong>
        .
      </>
    ),
    target: "#button",
    placement: "top" as const,
    ...defaultStepProps,
  } satisfies Step,
  {
    title: <>How to play</>,
    content: (
      <>
        You are on{" "}
        <strong className="font-semibold text-orange-400">level 1</strong>, so
        you have to{" "}
        <strong className="font-semibold text-slate-50">
          press the button
        </strong>{" "}
        when the square appears{" "}
        <strong className="font-semibold text-slate-50">
          in the same spot as
        </strong>{" "}
        <strong className="font-semibold text-orange-400">1 step before</strong>
        . In other words,{" "}
        <strong className="font-semibold text-slate-50">
          press the button
        </strong>{" "}
        when the square appears{" "}
        <strong className="font-semibold text-slate-50">
          two consecutive times
        </strong>{" "}
        on the same spot.
      </>
    ),
    target: "#board",
    placement: "bottom" as const,
    offset: -boardSize / 2,
    ...defaultStepProps,
  } satisfies Step,
  {
    title: <>Let&apos;s test your skills!</>,
    content: (
      <>
        Let&apos;s{" "}
        <strong className="font-semibold text-slate-50">play a game</strong> to
        see if you understood the instructions. We will{" "}
        <strong className="font-semibold text-slate-50">help you</strong> along
        the way.
      </>
    ),
    target: "body",
    placement: "center" as const,
    data: {
      buttonText: "Play",
    },
    ...defaultStepProps,
  } satisfies Step,
];

interface PlayTutorialStepsProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
}

export default function PlayTutorialSteps({
  step,
  setStep,
  isRunning,
  setIsRunning,
}: PlayTutorialStepsProps) {
  const [loaded, setLoaded] = useState(false);
  const [boardSize, setBoardSize] = useState(0);

  const steps = useMemo(() => getSteps(boardSize), [boardSize]);

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
      // disableScrollParentFix={true}
      styles={{
        options: {
          arrowColor: "var(--slate-800)",
        },
      }}
    />
  );
}
