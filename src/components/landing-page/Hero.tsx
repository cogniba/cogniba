import Link from "next/link";
import { Strong } from "../ui/Strong";
import { Button } from "../ui/button";
import FancyButton from "../ui/FancyButton";

export default function Hero() {
  return (
    <main className="grid justify-center pt-40 text-center">
      <div className="space-y-1 pb-8 text-7xl">
        <h1 className="font-medium">Train Your Mind</h1>
        <h1 className="inline-block animate-gradient-x bg-gradient-to-r from-orange-500 to-pink-500 bg-[length:400%_100%] bg-clip-text pb-4 font-semibold text-transparent">
          Boost your IQ
        </h1>
      </div>
      {/* TODO: Balanced text */}
      <h2 className="max-w-2xl text-balance pb-16 text-xl text-foreground/90">
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
              "rgb(var(--link-foreground))",
              "rgb(var(--primary))",
              "rgb(var(--link-foreground))",
            ]}
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
