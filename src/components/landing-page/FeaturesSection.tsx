import { FlaskConicalIcon, AreaChartIcon, Gamepad2Icon } from "lucide-react";
import { Strong } from "../ui/Strong";
import Glow from "../Glow";
import { cn } from "@/lib/cn";

import styles from "@/styles/modules/AnimatedBorder.module.css";
import BackgroundGlow from "../ui/BackgroundGlow";

const features = [
  {
    Icon: FlaskConicalIcon,
    title: "Backed By Science",
    description: (
      <>
        <Glow glowSize="24px" glowOpacity={75}>
          <Strong variant="primary">Cogniba</Strong>
        </Glow>{" "}
        is based on research showing real <Strong>IQ improvements</Strong>.
        It&apos;s designed to boost <Strong>brain power</Strong> and help you
        reach new levels of <Strong>mental performance</Strong>.
      </>
    ),
  },
  {
    Icon: AreaChartIcon,
    title: "Track Your Progress",
    description: (
      <>
        Get <Strong>personalized feedback</Strong> as you go.{" "}
        <Glow glowSize="24px" glowOpacity={75}>
          <Strong variant="primary">Cogniba</Strong>
        </Glow>{" "}
        helps you see your <Strong>growth over time</Strong>, giving you
        insights into your progress and{" "}
        <Strong>how far you&apos;ve come</Strong>.
      </>
    ),
  },
  {
    Icon: Gamepad2Icon,
    title: "Fun and Engaging",
    description: (
      <>
        <Glow glowSize="24px" glowOpacity={75}>
          <Strong variant="primary">Cogniba</Strong>
        </Glow>{" "}
        makes training your brain a <Strong>fun challenge</Strong>. Each session
        is designed to keep you{" "}
        <Strong>engaged and motivated to improve</Strong>, all while playing an{" "}
        <Strong>enjoyable game</Strong>.
      </>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-6 shadow-md lg:flex-row">
      {features.map((feature, index) => (
        <div
          key={index}
          className={cn(
            "bg-background relative size-full rounded-lg border px-8 py-7 lg:py-10",
            styles["animatedBorder"],
          )}
          style={
            {
              "--border-width": "0.125rem",
              "--border-colors":
                "rgb(var(--primary) / 0.75), rgb(var(--border)), rgb(var(--primary) / 0.75), rgb(var(--border)), rgb(var(--primary) / 0.75)",
              "--animation-duration": "10s",
              "--glow-size": "16px",
              "--glow-opacity": "0.10",
            } as React.CSSProperties
          }
        >
          <BackgroundGlow
            className="hidden lg:block"
            zIndex={0}
            glowColors={[
              "rgb(var(--primary) / 0.075)",
              "rgb(var(--primary) / 0)",
              "rgb(var(--primary) / 0.175)",
              "rgb(var(--primary) / 0)",
              "rgb(var(--primary) / 0.075)",
            ]}
          />
          <BackgroundGlow
            className="lg:hidden"
            zIndex={0}
            glowColors={[
              "rgb(var(--primary) / 0.025)",
              "rgb(var(--primary) / 0)",
              "rgb(var(--primary) / 0.075)",
              "rgb(var(--primary) / 0)",
              "rgb(var(--primary) / 0.025)",
            ]}
          />
          <Glow display="block" glowSize="32px" glowOpacity={75}>
            <feature.Icon className="text-primary xs:size-10 size-8" />
          </Glow>
          <Glow display="block" glowOpacity={25}>
            <h2 className="xs:pb-2 xs:text-2xl pt-3 pb-1.5 text-xl font-semibold lg:pt-5">
              {feature.title}
            </h2>
          </Glow>
          <Glow display="block" glowOpacity={25}>
            <p className="text-foreground/90 xs:text-base text-sm">
              {feature.description}
            </p>
          </Glow>
        </div>
      ))}
    </section>
  );
}
