import { Strong } from "@/components/ui/Strong";

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div>In progress...</div>
      <div>
        Meanwhile, you can read{" "}
        <Strong variant="link">
          <a
            href="https://gwern.net/dnb-faq"
            target="_blank"
            rel="noopener noreferrer"
          >
            this Frequently Asked Questions
          </a>
        </Strong>
        .
      </div>
    </div>
  );
}
