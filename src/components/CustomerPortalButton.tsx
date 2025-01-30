"use client";

import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import createCustomerPortal from "@/actions/stripe/createCustomerPortal";
import { useTransition } from "react";
import LoaderWrapper from "./LoaderWrapper";

interface CustomerPortalButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export default function CustomerPortalButton({
  children,
  className,
}: CustomerPortalButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleCustomerPortal = () => {
    startTransition(async () => {
      const { url, error } = await createCustomerPortal({
        return_url: window.location.href,
      });

      if (error || !url) {
        const error = new Error("Failed to open customer portal");
        console.error(error);

        const errorUrl = new URL("/error", origin);
        errorUrl.searchParams.set("message", error.message);
        redirect(errorUrl.toString());
      }

      window.location.href = url;
    });
  };

  return (
    <Button onClick={handleCustomerPortal} className={className}>
      <LoaderWrapper loading={isPending}>{children}</LoaderWrapper>
    </Button>
  );
}
