import type { Metadata } from "next";
import { Strong } from "@/components/ui/Strong";
import { getCanonicalUrl } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const canonicalUrl = getCanonicalUrl();
  const pageUrl = new URL("/research", canonicalUrl).toString();

  return {
    title: "Research",
    description:
      "Read the research behind Cogniba's n-back training approach and how working memory training impacts cognition.",
    keywords: [
      "n-back research",
      "working memory science",
      "cognitive training",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Cogniba Research",
      description:
        "Read the research behind Cogniba's n-back training approach and how working memory training impacts cognition.",
      url: pageUrl,
      siteName: "Cogniba",
      type: "website",
      images: [
        {
          url: "/images/blog/cogniba-launch.png",
          width: 1200,
          height: 630,
          alt: "Cogniba Research",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cogniba Research",
      description:
        "Read the research behind Cogniba's n-back training approach and how working memory training impacts cognition.",
      images: ["/images/blog/cogniba-launch.png"],
    },
  };
}

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
