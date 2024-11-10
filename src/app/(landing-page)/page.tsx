import Header from "@/components/landing-page/Header";
import HeroSection from "@/components/landing-page/HeroSection";
import HowItWorksSection from "@/components/landing-page/HowItWorksSection";

export default function LandingPagePage() {
  return (
    <div>
      <Header />

      <main className="grid gap-56 py-40">
        <HeroSection />
        <HowItWorksSection />
      </main>
    </div>
  );
}
