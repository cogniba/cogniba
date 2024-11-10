import Glow from "../Glow";
import BackgroundGlow from "../ui/BackgroundGlow";
import LandingPageAnalytics from "./LandingPageAnalytics";
import LandingPageBoard from "./LandingPageBoard";

export default function HowItWorksSection() {
  return (
    <section className="relative mx-auto grid w-full max-w-6xl gap-36">
      <BackgroundGlow
        glowColors={[
          "rgb(var(--violet) / 0.05)",
          "rgb(var(--violet) / 0)",
          "rgb(var(--violet) / 0.125)",
          "rgb(var(--violet) / 0)",
          "rgb(var(--violet) / 0.05)",
        ]}
      />
      <div className="flex w-full items-center justify-between gap-36">
        <Glow display="block" className="w-full" glowOpacity={25}>
          <div className="grid w-full gap-4">
            <h2 className="text-4xl font-semibold">Train Your Brain</h2>
            <p className="text-foreground/95">
              Play Cogniba consistently to unlock your mind&apos;s potential.
              Each session helps you push your mental limits, working towards a
              higher IQ.
            </p>
          </div>
        </Glow>
        <Glow
          display="block"
          className="w-full"
          glowSize="32px"
          glowOpacity={20}
        >
          <LandingPageBoard />
        </Glow>
      </div>
      <div className="flex w-full items-center justify-between gap-36">
        <Glow
          display="block"
          className="w-full"
          glowSize="128px"
          glowOpacity={25}
        >
          <LandingPageAnalytics />
        </Glow>
        <Glow display="block" className="w-full" glowOpacity={25}>
          <div className="grid w-full gap-4">
            <h2 className="text-4xl font-semibold">See Your Improvement</h2>
            <p className="text-foreground/95">
              Track detailed analytics on your performance over time. Check your
              progress, view trends, and see exactly how much you&apos;ve
              improved.
            </p>
          </div>
        </Glow>
      </div>
      <div className="flex w-full items-center justify-between gap-12"></div>
    </section>
  );
}
