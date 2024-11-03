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
    return <Loader2Icon className="mx-auto animate-spin" />;
  } else {
    return children;
  }
}
