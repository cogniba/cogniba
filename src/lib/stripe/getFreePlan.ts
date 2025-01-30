import stripeConfig, { PlanType } from "@/config/stripe";

export default function getFreePlan(): { freePlan?: PlanType; error?: string } {
  const freePlan = stripeConfig.plans.find((plan) => plan.isFreePlan);
  if (!freePlan) {
    const error = new Error("No free plan found in stripe config");
    console.error(error);
    return { error: error.message };
  }

  return { freePlan };
}
