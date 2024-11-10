import { FlaskConicalIcon, AreaChartIcon, Gamepad2Icon } from "lucide-react";
import { Strong } from "../ui/Strong";
import Glow from "../Glow";
import { cn } from "@/lib/cn";

import styles from "@/styles/AnimatedBorder.module.css";
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
    <section className="mx-auto flex w-full max-w-6xl items-center justify-center gap-6 shadow-md">
      {features.map((feature, index) => (
        <div
          key={index}
          className={cn(
            "relative size-full rounded-lg border bg-background px-8 py-10",
            styles.animatedBorder,
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
            zIndex={0}
            glowColors={[
              "rgb(var(--primary) / 0.05)",
              "rgb(var(--primary) / 0)",
              "rgb(var(--primary) / 0.15)",
              "rgb(var(--primary) / 0)",
              "rgb(var(--primary) / 0.05)",
            ]}
            // glowColors={[
            //   "rgb(var(--red))",
            //   "rgb(var(--red))",
            //   "rgb(var(--red))",
            //   "rgb(var(--red))",
            //   "rgb(var(--red))",
            // ]}
          />
          <Glow display="block" glowSize="32px" glowOpacity={75}>
            <feature.Icon className="size-10 text-primary" />
          </Glow>
          <Glow display="block" glowOpacity={25}>
            <h2 className="pb-2 pt-5 text-2xl font-semibold">
              {feature.title}
            </h2>
          </Glow>
          <Glow display="block" glowOpacity={25}>
            <p className="text-foreground/90">{feature.description}</p>
          </Glow>
        </div>
      ))}
    </section>
  );
}
