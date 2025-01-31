"use client";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "./ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

interface RootLayoutWrapperProps {
  readonly children: React.ReactNode;
}

export default function RootLayoutWrapper({
  children,
}: RootLayoutWrapperProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}
