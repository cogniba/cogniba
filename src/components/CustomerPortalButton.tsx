"use client";

import { Button } from "./ui/button";
import createCustomerPortal from "@/actions/stripe/createCustomerPortal";
import { useTransition } from "react";
import LoaderWrapper from "./LoaderWrapper";
import redirectToError from "@/actions/redirectToError";
import { usePostHog } from "posthog-js/react";

interface CustomerPortalButtonProps {
  children?: React.ReactNode;
  className?: string;
  targetPlan?: string;
}

export default function CustomerPortalButton({
  children,
  className,
  targetPlan,
}: CustomerPortalButtonProps) {
  const posthog = usePostHog();
  const [isPending, startTransition] = useTransition();

  const handleCustomerPortal = () => {
    startTransition(async () => {
      posthog.capture("customer_portal_clicked", { target_plan: targetPlan });
      const { url, error } = await createCustomerPortal({
        return_url: window.location.href,
      });

      if (error || !url) {
        return redirectToError("Failed to open customer portal");
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
