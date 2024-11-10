import Link from "next/link";
import { Strong } from "../ui/Strong";
import { Button } from "../ui/button";
import FancyButton from "../ui/FancyButton/FancyButton";
import Glow from "../Glow";
import BackgroundGlow from "../ui/BackgroundGlow/BackgroundGlow";

export default function HeroSection() {
  return (
    <section className="grid justify-center text-center">
      <BackgroundGlow
        glowColors={[
          "rgb(var(--blue) / 0.05)",
          "rgb(var(--blue) / 0)",
          "rgb(var(--blue) / 0.15)",
          "rgb(var(--blue) / 0)",
          "rgb(var(--blue) / 0.05)",
        ]}
      />
      <div className="space-y-1 pb-8 text-7xl">
        <Glow glowOpacity={25} display="block">
          <h1 className="relative font-medium">Train Your Mind</h1>
        </Glow>
        <Glow display="block">
          <h1 className="glow inline-block animate-gradient-x bg-gradient-to-r from-orange-500 to-pink-500 bg-[length:400%_100%] bg-clip-text pb-4 font-semibold text-transparent">
            Boost your IQ
          </h1>
        </Glow>
      </div>
      <Glow glowOpacity={25}>
        <h2 className="relative max-w-2xl text-balance pb-16 text-xl text-foreground/90">
          <Glow glowSize="24px" glowOpacity={75}>
            <Strong variant="primary">Cogniba</Strong>
          </Glow>{" "}
          is an <Strong>open-source</Strong> tool based on the{" "}
          <Glow glowSize="24px" glowOpacity={75}>
            <Strong variant="link" className="hover:underline">
              <a
                href="https://en.wikipedia.org/wiki/N-back"
                target="_blank"
                rel="noopener noreferrer"
              >
                N-Back task
              </a>
            </Strong>
          </Glow>
          , the only proven method to <Strong>enhance your IQ</Strong> through{" "}
          <Strong>science-backed training</Strong>.
        </h2>
      </Glow>
      <div className="mx-auto flex gap-4">
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
        <Link href="sign-in">
          <Button variant="secondary" size="lg">
            Learn More
          </Button>
        </Link>
      </div>
    </section>
  );
}
