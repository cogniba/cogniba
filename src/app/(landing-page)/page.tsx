import FeaturesSection from "@/components/landing-page/FeaturesSection";
import Header from "@/components/landing-page/Header";
import HeroSection from "@/components/landing-page/HeroSection";
import HowItWorksSection from "@/components/landing-page/HowItWorksSection";
import FancyButton from "@/components/ui/FancyButton";
import Link from "next/link";

export default function LandingPagePage() {
  return (
    <div>
      <Header />
      <main className="grid gap-40 px-6 py-28 xs:gap-48 xs:py-32 md:gap-56 md:py-40">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />

        <div className="mx-auto -mt-12 xs:-mt-16 md:-mt-16">
          <Link href="sign-up">
            <FancyButton
              size="lg"
              borderColors={[
                "rgb(var(--cyan))",
                "rgb(var(--fuchsia))",
                "rgb(var(--cyan))",
                "rgb(var(--fuchsia))",
                "rgb(var(--cyan))",
              ]}
              borderWidth="1px"
            >
              Get Started
            </FancyButton>
          </Link>
        </div>
      </main>
    </div>
  );
}
