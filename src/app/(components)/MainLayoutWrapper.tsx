import { ThemeProvider } from "@/components/ThemeProvider";

interface MainLayoutWrapperProps {
  readonly children: React.ReactNode;
}

export default function MainLayoutWrapper({
  children,
}: MainLayoutWrapperProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      // disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
