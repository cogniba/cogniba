import Link from "next/link";

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
      <h2 className="max-w-2xl text-xl text-foreground/90">
        <span className="font-semibold text-primary">Cogniba</span> is an{" "}
        <strong className="font-semibold text-foreground">open-source</strong>{" "}
        tool based on the{" "}
        <a
          href="https://en.wikipedia.org/wiki/N-back"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link-foreground font-semibold hover:underline"
          // TODO: Link color to globals.css
        >
          N-Back task
        </a>
        , the only proven method to{" "}
        <strong className="font-semibold text-foreground">
          enhance your IQ
        </strong>{" "}
        through{" "}
        <strong className="font-semibold text-foreground">
          science-backed training
        </strong>
        .
      </h2>
    </main>
  );
}
