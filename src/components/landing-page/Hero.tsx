import Link from "next/link";
import { Strong } from "../ui/Strong";
import { Button } from "../ui/button";
import FancyButton from "../ui/FancyButton";

export default function Hero() {
  return (
    <main className="grid justify-center pt-40 text-center">
      <div className="space-y-1 pb-8 text-7xl">
        <h1 className="relative font-medium">
          <h1 className="absolute left-1/2 top-1/2 -z-10 size-full -translate-x-1/2 -translate-y-1/2 font-medium opacity-20 blur-3xl">
            Train Your Mind
          </h1>
          Train Your Mind
        </h1>
        <h1 className="relative inline-block animate-gradient-x bg-gradient-to-r from-orange-500 to-pink-500 bg-[length:400%_100%] bg-clip-text pb-4 font-semibold text-transparent">
          Boost your IQ
          <h1 className="absolute left-1/2 top-1/2 -z-10 inline-block h-full w-full -translate-x-1/2 -translate-y-1/2 animate-gradient-x bg-gradient-to-r from-orange-500 to-pink-500 bg-[length:400%_100%] bg-clip-text pb-4 font-semibold text-transparent opacity-50 blur-3xl">
            Boost your IQ
          </h1>
        </h1>
      </div>
      <h2 className="relative max-w-2xl text-balance pb-16 text-xl text-foreground/90">
        <Strong variant="primary">Cogniba</Strong> is an{" "}
        <Strong>open-source</Strong> tool based on the{" "}
        <Strong variant="link" className="hover:underline">
          <a
            href="https://en.wikipedia.org/wiki/N-back"
            target="_blank"
            rel="noopener noreferrer"
          >
            N-Back task
          </a>
        </Strong>
        , the only proven method to <Strong>enhance your IQ</Strong> through{" "}
        <Strong>science-backed training</Strong>.
      </h2>
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
    </main>
  );
}
