import redirectToError from "@/actions/redirectToError";
import CheckoutButton from "@/components/CheckoutButton";
import CustomerPortalButton from "@/components/CustomerPortalButton";
import { Button } from "@/components/ui/button";
import stripeConfig from "@/config/stripe";
import { db } from "@/database";
import { customersTable } from "@/database/schemas/customersTable";
import getFreePlan from "@/lib/stripe/getFreePlan";
import createClient from "@/lib/supabase/server";
import { cn } from "@/lib/cn";
import { eq } from "drizzle-orm";
import { CheckIcon } from "lucide-react";

export default async function PricingPage() {
  const plans = stripeConfig.plans;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirectToError("Failed to get user");
    return;
  }

  const { freePlan, error } = getFreePlan();
  if (error || !freePlan) {
    redirectToError("Failed to load free pricing plan");
    return;
  }

  const currentPlanName = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.userId, user.id))
    .then((res) =>
      res.length === 1 ? res[0].subscriptionType : freePlan.name,
    );

  const currentPlan = plans.find((plan) => plan.name === currentPlanName);
  if (!currentPlan) {
    redirectToError("Failed to load current plan");
    return;
  }

  return (
    <div className="flex h-full w-full flex-col items-center gap-12 px-4 pb-12 pt-12 md:pt-24">
      <div className="grid gap-2 text-center">
        <h1 className="text-4xl font-semibold xs:text-5xl">Choose Your Plan</h1>
        {/* TODO */}
        <p className="text-base text-foreground/80 xs:text-lg">
          Start for free or go unlimited for the best results!
        </p>
      </div>
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-4 md:flex-row">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={cn(
              "relative h-full w-full max-w-96 rounded-lg border bg-background px-6 py-6 shadow-sm md:max-w-80",
              plan.highlighted && "border-primary",
            )}
          >
            <h2 className="pb-0.5 text-2xl font-semibold">{plan.name}</h2>
            <p className="pb-8 text-foreground/90">{plan.description}</p>
            <p className="flex items-end gap-1 pb-8 font-light">
              <span className="text-5xl font-medium">${plan.price}</span>
              <span className="text-foreground/80">/ month</span>
            </p>
            {currentPlan.name === plan.name ? (
              <Button disabled className="bg w-full">
                Current Plan
              </Button>
            ) : currentPlan.price < plan.price ? (
              <CheckoutButton priceId={plan.priceId} className="w-full">
                Upgrade to {plan.name}
              </CheckoutButton>
            ) : (
              <CustomerPortalButton className="w-full">
                Downgrade to {plan.name}
              </CustomerPortalButton>
            )}

            <hr className="my-8" />
            <div className="mb-2 grid gap-1.5">
              {plan.features.map((feature, index) => (
                <p key={index} className="flex gap-2">
                  <CheckIcon className="text-primary" />
                  <span>{feature}</span>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
