"use client";

import Joyride from "react-joyride";
import PlayTutorialTooltip from "./PlayTutorialTooltip";
import { useEffect, useState } from "react";

const defaultStepProps = {
  isFixed: true,
  disableBeacon: true,
  disableCloseOnEsc: true,
  disableOverlayClose: true,
};

const steps = [
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
  },
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
  },
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
  },
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
    placement: "right" as const,
    ...defaultStepProps,
  },
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
  },
];

export default function PlayTutorial() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <Joyride
      tooltipComponent={PlayTutorialTooltip}
      steps={steps}
      styles={{
        options: {
          arrowColor: "var(--slate-800)",
        },
      }}
    />
  );
}
