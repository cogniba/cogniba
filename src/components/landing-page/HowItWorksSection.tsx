import LandingPageAnalytics from "./LandingPageAnalytics";
import LandingPageBoard from "./LandingPageBoard";

export default function HowItWorksSection() {
  return (
    <section className="mx-auto grid w-full max-w-4xl gap-32">
      <div className="flex w-full items-center justify-between gap-24">
        <div className="grid w-full gap-4">
          <h2 className="text-4xl font-semibold">Train Your Brain</h2>
          <p className="text-foreground/95">
            Play Cogniba consistently to unlock your mind&apos;s potential. Each
            session helps you push your mental limits, working towards a higher
            IQ.
          </p>
        </div>
        <LandingPageBoard />
      </div>
      <div className="flex w-full items-center justify-between gap-24">
        <LandingPageAnalytics />
        <div className="w-full">
          <h2 className="text-4xl font-semibold">See Your Improvement</h2>
          <p className="text-foreground/95">
            Track detailed analytics on your performance over time. Check your
            progress, view trends, and see exactly how much you&apos;ve
            improved.
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-12"></div>
    </section>
  );
}
