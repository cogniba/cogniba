import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import stripeConfig from "@/config/stripeConfig";
import { cn } from "@/lib/cn";
import { getCanonicalUrl } from "@/lib/seo";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

export function generateMetadata(): Metadata {
  const canonicalUrl = getCanonicalUrl();
  const pageUrl = new URL("/pricing", canonicalUrl).toString();

  return {
    title: "Pricing",
    description:
      "See Cogniba pricing and choose a plan to start training your working memory with science-backed n-back exercises.",
    keywords: ["cognitive training pricing", "brain training plans", "n-back"],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Cogniba Pricing",
      description:
        "See Cogniba pricing and choose a plan to start training your working memory with science-backed n-back exercises.",
      url: pageUrl,
      siteName: "Cogniba",
      type: "website",
      images: [
        {
          url: "/images/blog/cogniba-launch.png",
          width: 1200,
          height: 630,
          alt: "Cogniba Pricing",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cogniba Pricing",
      description:
        "See Cogniba pricing and choose a plan to start training your working memory with science-backed n-back exercises.",
      images: ["/images/blog/cogniba-launch.png"],
    },
  };
}

export default function PricingPage() {
  const pricingPlans = stripeConfig.plans;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-12 px-4 py-10">
      <div className="grid gap-2 text-center">
        <h1 className="xs:text-5xl text-4xl font-semibold">Choose Your Plan</h1>
        {/* TODO */}
        <p className="text-foreground/80 xs:text-lg text-base">
          Start for free or go unlimited for the best results!
        </p>
      </div>
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-4 md:flex-row">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={cn(
              "bg-background relative h-full w-full max-w-96 rounded-lg border px-6 py-6 shadow-sm md:max-w-80",
              plan.highlighted && "border-primary",
            )}
          >
            <h2 className="pb-0.5 text-2xl font-semibold">{plan.name}</h2>
            <p className="text-foreground/90 pb-8">{plan.description}</p>
            <p className="flex items-end gap-1 pb-8 font-light">
              <span className="text-5xl font-medium">${plan.price}</span>
              <span className="text-foreground/80">/ month</span>
            </p>
            <Link href="/sign-up">
              <Button className="w-full">
                {plan.isFreePlan ? "Start for Free" : "Get Started"}
              </Button>
            </Link>
            <hr className="my-8" />
            <div className="mb-2 grid gap-1.5">
              {plan.features.map((feature, index) => (
                <p key={index} className="flex gap-2">
                  <CheckIcon className="text-primary" />
                  <span>{feature}</span>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
