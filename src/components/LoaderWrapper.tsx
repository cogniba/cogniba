import { Loader2Icon } from "lucide-react";

type LoaderWrapperProps = {
  loading: boolean;
  children: React.ReactNode;
};

export default function LoaderWrapper({
  loading: isLoading,
  children,
}: LoaderWrapperProps) {
  if (isLoading) {
    return (
      <>
        <div className="relative [display:inherit] w-full">
          <div className="[display:inherit] opacity-0">{children}</div>
          <div className="absolute inset-0 flex h-full w-full items-center justify-center">
            <Loader2Icon className="z-50 animate-spin opacity-100" />
          </div>
        </div>
      </>
    );
  } else {
    return children;
  }
}
