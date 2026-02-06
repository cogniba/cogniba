import "@/styles/globals/globals.css";

import type { Metadata } from "next";
import RootLayoutWrapper from "@/components/RootLayoutWrapper";
import { Inter, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/cn";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://cogniba.com",
  ),
  title: {
    default: "Cogniba | The Scientific Brain Training App",
    template: "%s | Cogniba",
  },
  description:
    "Increase your IQ and working memory with the only scientifically validated brain training method. Join Cogniba today.",
  keywords: [
    "brain training",
    "n-back",
    "working memory",
    "increase IQ",
    "cognitive training",
    "dual n-back",
  ],
  authors: [{ name: "Cogniba Team" }],
  creator: "Cogniba",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Cogniba | Scientific Brain Training",
    description:
      "The only proven way to increase your intelligence. Based on the n-back task.",
    siteName: "Cogniba",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cogniba - Scientific Brain Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cogniba | Scientific Brain Training",
    description: "The only proven way to increase your intelligence.",
    images: ["/og-image.png"],
    creator: "@cogniba",
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
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
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
      </body>
    </html>
  );
}
