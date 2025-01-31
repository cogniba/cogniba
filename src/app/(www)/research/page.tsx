import { Strong } from "@/components/ui/Strong";

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div>In progress...</div>
      <div>
        Meanwhile, you can read this study:{" "}
        <Strong variant="link">
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/28116702/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Working memory training revisited: A multi-level meta-analysis of
            n-back training studies
          </a>
        </Strong>
        .
      </div>
    </div>
  );
}
