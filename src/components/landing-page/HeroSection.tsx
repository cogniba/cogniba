import Link from "next/link";
import { Strong } from "../ui/Strong";
import { Button } from "../ui/button";
import FancyButton from "../ui/FancyButton";
import Glow from "../Glow";
import BackgroundGlow from "../ui/BackgroundGlow";
import FadeInOnScroll from "../FadeInOnScroll";

export default function HeroSection() {
  return (
    <section className="relative grid justify-center text-center">
      <BackgroundGlow
        glowColors={[
          "rgb(var(--blue) / 0.05)",
          "rgb(var(--blue) / 0)",
          "rgb(var(--blue) / 0.15)",
          "rgb(var(--blue) / 0)",
          "rgb(var(--blue) / 0.05)",
        ]}
      />
      <div className="space-y-1 pb-2 text-4xl xs:pb-4 xs:text-5xl sm:pb-8 sm:text-7xl">
        <Glow glowOpacity={25} display="block">
          <FadeInOnScroll duration={0.8}>
            <h1 className="relative font-medium">Train Your Mind</h1>
          </FadeInOnScroll>
        </Glow>
        <Glow display="block">
          <FadeInOnScroll duration={0.7} delay={0.4}>
            <h1 className="glow inline-block animate-gradient-x bg-gradient-to-r from-orange to-pink bg-[length:400%_100%] bg-clip-text pb-4 font-semibold text-transparent">
              Boost your IQ
            </h1>
          </FadeInOnScroll>
        </Glow>
      </div>
      <Glow glowOpacity={25}>
        <FadeInOnScroll duration={0.6} delay={0.75}>
          <h2 className="relative max-w-2xl text-balance pb-10 text-sm text-foreground/90 xs:pb-12 xs:text-base sm:pb-16 sm:text-xl">
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
        </FadeInOnScroll>
      </Glow>
      <div className="z-10 mx-auto flex gap-4">
        <FadeInOnScroll duration={0.5} delay={1.2}>
          <Link href="sign-up">
            <FancyButton
              className="h-10 rounded-md px-6 xs:h-11 xs:px-8"
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
        </FadeInOnScroll>
        <FadeInOnScroll duration={0.5} delay={1.3}>
          <Link href="research">
            <Button
              className="h-10 rounded-md px-6 xs:h-11 xs:px-8"
              variant="secondary"
            >
              Learn More
            </Button>
          </Link>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
