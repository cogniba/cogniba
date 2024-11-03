import { Loader2Icon } from "lucide-react";

interface LoaderWrapperProps {
  loading: boolean;
  children: React.ReactNode;
}

export default function LoaderWrapper({
  loading: isLoading,
  children,
}: LoaderWrapperProps) {
  if (isLoading) {
    return (
      <>
        <div className="text-transparent opacity-0">{children}</div>
        <Loader2Icon className="fixed mx-auto animate-spin" />
      </>
    );
  } else {
    return children;
  }
}
