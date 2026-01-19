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
  title: "Cogniba",
  description: "The only proven way to increase your intelligence.",
};

type RootLayoutProps = {
  readonly children: React.ReactNode;
};

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
