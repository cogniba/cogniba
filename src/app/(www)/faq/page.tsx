// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
import type { Metadata } from "next";
import { Strong } from "@/components/ui/Strong";
import { getCanonicalUrl } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const canonicalUrl = getCanonicalUrl();
  const pageUrl = new URL("/faq", canonicalUrl).toString();

  return {
    title: "FAQ",
    description:
      "Answers to the most common questions about Cogniba, working memory training, and n-back exercises.",
    keywords: ["cognitive training FAQ", "n-back questions", "working memory"],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Cogniba FAQ",
      description:
        "Answers to the most common questions about Cogniba, working memory training, and n-back exercises.",
      url: pageUrl,
      siteName: "Cogniba",
      type: "website",
      images: [
        {
          url: "/images/blog/cogniba-launch.png",
          width: 1200,
          height: 630,
          alt: "Cogniba FAQ",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cogniba FAQ",
      description:
        "Answers to the most common questions about Cogniba, working memory training, and n-back exercises.",
      images: ["/images/blog/cogniba-launch.png"],
    },
  };
}

export default function FAQ() {
  // <div className="h-full w-full px-4 py-10">
  //   <Accordion type="multiple" className="mx-auto max-w-3xl">
  //     {questions.map((question, index) => (
  //       <AccordionItem key={index} value={`item-${index + 1}`}>
  //         <AccordionTrigger>{question.question}</AccordionTrigger>
  //         <AccordionContent>{question.answer}</AccordionContent>
  //       </AccordionItem>
  //     ))}
  //   </Accordion>
  // </div>

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
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
