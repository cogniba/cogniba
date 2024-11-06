import CognibaLogo from "@/components/CognibaLogo";

interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <div className="fixed left-0 top-0 flex h-16 w-full items-center justify-center bg-transparent">
        <div className="flex w-full max-w-7xl items-start bg-transparent px-6">
          <CognibaLogo />
        </div>
      </div>
      {children}
    </>
  );
}
