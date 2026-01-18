"use client";

import createCheckout from "@/actions/stripe/createCheckout";
import { Button } from "./ui/button";
import { useTransition } from "react";
import LoaderWrapper from "./LoaderWrapper";
import redirectToError from "@/actions/redirectToError";
import { usePostHog } from "posthog-js/react";
import getEnv from "@/lib/env";

type CheckoutButtonProps = {
  children?: React.ReactNode;
  priceId: string;
  className?: string;
};

export default function CheckoutButton({
  children,
  priceId,
  className,
}: CheckoutButtonProps) {
  const posthog = usePostHog();
  const [isPending, startTransition] = useTransition();

  const handleCheckout = () => {
    posthog.capture("checkout_button_clicked", { price_id: priceId });

    startTransition(async () => {
      const { url, error } = await createCheckout({
        mode: "subscription",
        priceId,
        successUrl: `${getEnv("NEXT_PUBLIC_SITE_URL")}/app/success`,
        cancelUrl: window.location.href,
      });

      if (error || !url) {
        posthog.capture("checkout_error", { price_id: priceId, error });
        return redirectToError("Failed to create checkout session");
      }

      posthog.capture("checkout_initiated", { price_id: priceId });
      window.location.href = url;
    });
  };

  return (
    <Button onClick={handleCheckout} className={className}>
      <LoaderWrapper loading={isPending}>{children}</LoaderWrapper>
    </Button>
  );
}
