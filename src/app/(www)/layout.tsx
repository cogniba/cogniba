import Header from "@/components/landing-page/Header";

interface LandingPageLayoutProps {
  children: React.ReactNode;
}

export default function LandingPageLayout({
  children,
}: LandingPageLayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
