import type { Metadata } from "next";
import FeaturesSection from "@/components/landing-page/FeaturesSection";
import HeroSection from "@/components/landing-page/HeroSection";
import HowItWorksSection from "@/components/landing-page/HowItWorksSection";
import FancyButton from "@/components/ui/FancyButton";
import { getCanonicalUrl } from "@/lib/seo";
import Link from "next/link";

export function generateMetadata(): Metadata {
  const canonicalUrl = getCanonicalUrl();

  return {
    title: "Cogniba",
    description:
      "Science-backed n-back training to improve working memory, focus, and fluid intelligence. Start training your brain with Cogniba today.",
    keywords: [
      "n-back training",
      "working memory",
      "cognitive training",
      "brain training",
      "focus improvement",
    ],
    alternates: {
      canonical: canonicalUrl.toString(),
    },
    openGraph: {
      title: "Cogniba",
      description:
        "Science-backed n-back training to improve working memory, focus, and fluid intelligence. Start training your brain with Cogniba today.",
      url: canonicalUrl.toString(),
      siteName: "Cogniba",
      type: "website",
      images: [
        {
          url: "/images/blog/cogniba-launch.png",
          width: 1200,
          height: 630,
          alt: "Cogniba",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cogniba",
      description:
        "Science-backed n-back training to improve working memory, focus, and fluid intelligence. Start training your brain with Cogniba today.",
      images: ["/images/blog/cogniba-launch.png"],
    },
  };
}

export default function LandingPagePage() {
  return (
    <main className="xs:gap-48 xs:py-32 mx-auto grid gap-40 px-6 py-28 md:gap-56 md:py-32">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />

      <div className="xs:-mt-16 mx-auto -mt-12 md:-mt-16">
        <Link href="/sign-up">
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
      </div>
    </main>
  );
}
