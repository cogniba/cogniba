import "@/styles/globals/globals.css";

import type { Metadata } from "next";
import RootLayoutWrapper from "@/components/RootLayoutWrapper";
import { Inter, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/cn";
import { getCanonicalUrl } from "@/lib/seo";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const canonicalUrl = getCanonicalUrl();

export const metadata: Metadata = {
  metadataBase: canonicalUrl,
  title: {
    default: "Cogniba",
    template: "%s | Cogniba",
  },
  description:
    "Train your working memory and cognition with the n-back method. Proven brain training designed to help you focus, learn faster, and get smarter.",
  alternates: {
    canonical: canonicalUrl,
  },
  keywords: [
    "cognitive training",
    "working memory",
    "n-back",
    "brain training",
    "neuroplasticity",
    "focus training",
    "intelligence improvement",
  ],
  applicationName: "Cogniba",
  creator: "Cogniba",
  publisher: "Cogniba",
  openGraph: {
    title: "Cogniba",
    description:
      "Train your working memory and cognition with the n-back method. Proven brain training designed to help you focus, learn faster, and get smarter.",
    type: "website",
    url: canonicalUrl,
    siteName: "Cogniba",
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
      "Train your working memory and cognition with the n-back method. Proven brain training designed to help you focus, learn faster, and get smarter.",
    images: ["/images/blog/cogniba-launch.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Technology",
};

type RootLayoutProps = {
  readonly children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cogniba",
    url: canonicalUrl.toString(),
    logo: `${canonicalUrl.toString()}/logo.svg`,
    sameAs: [],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "font-sans antialiased",
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </body>
    </html>
  );
}
