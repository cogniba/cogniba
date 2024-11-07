import Link from "next/link";
import { Strong } from "../ui/Strong";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <main className="grid justify-center pt-40 text-center">
      <div className="space-y-1 pb-8 text-7xl">
        <h1 className="font-medium">Train Your Mind</h1>
        <h1 className="animate-gradient-x inline-block bg-gradient-to-r from-orange-500 to-pink-500 bg-[length:400%_100%] bg-clip-text pb-4 font-semibold text-transparent">
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
        <Button size="lg" className="animated-border relative">
          Get Started
        </Button>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @property --angle {
                syntax: "<angle>";
                initial-value: 0deg;
                inherits: false;
              }

              .animated-border::before, .animated-border::after {
                --angle: 0deg;

                content: "";
                box-sizing: content-box;
                position: absolute;
                height: 100%;
                width: 100%;
                top: 50%;
                left: 50%;
                translate: -50% -50%;
                z-index: -1;
                padding: 0.125rem;
                border-radius: inherit;
                background-image: conic-gradient(from var(--angle), blue, transparent, blue, transparent, blue);
                animation: 3s spin linear infinite;
              }

              .animated-border::before {
                filter: blur(1.5rem);
                opacity: 0.5;
              }

              @keyframes spin {
                from {
                  --angle: 0deg;
                }
                to {
                  --angle: 360deg;
                }
              }
            `,
          }}
        ></style>
        <Button variant="secondary" size="lg">
          Learn More
        </Button>
      </div>
    </main>
  );
}
