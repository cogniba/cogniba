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
      <div className="flex w-full flex-col items-center justify-between gap-9 xs:flex-row xs:gap-12 sm:gap-16 md:gap-20 lg:gap-24 xl:gap-36">
        <Glow display="block" className="w-full" glowOpacity={25}>
          <div className="grid w-full gap-2 sm:gap-3 md:gap-4">
            <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
              Train Your Brain
            </h2>
            <p className="text-sm text-foreground/95 sm:text-base">
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
      <div className="flex w-full flex-col-reverse items-center justify-between gap-9 xs:flex-row xs:gap-12 sm:gap-16 md:gap-20 lg:gap-24 xl:gap-36">
        <Glow
          display="block"
          className="w-full"
          glowSize="128px"
          glowOpacity={25}
        >
          <LandingPageAnalytics />
        </Glow>
        <Glow display="block" className="w-full" glowOpacity={25}>
          <div className="grid w-full gap-2 sm:gap-3 md:gap-4">
            <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
              See Your Improvement
            </h2>
            <p className="text-sm text-foreground/95 sm:text-base">
              Track detailed analytics on your performance over time. Check your
              progress, view trends, and see exactly how much you&apos;ve
              improved.
            </p>
          </div>
        </Glow>
      </div>
    </section>
  );
}
