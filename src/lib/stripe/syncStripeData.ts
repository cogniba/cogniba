import { db } from "@/database";
import stripe from "./stripe";
import { eq } from "drizzle-orm";
import { customersTable } from "@/database/schemas/customersTable";
import { stripeTable } from "@/database/schemas/stripeTable";
import stripeConfig from "@/config/stripe";
import getFreePlan from "./getFreePlan";

export default async function syncStripeData(
  customerId: string,
): Promise<{ error?: string }> {
  const { freePlan, error } = getFreePlan();
  if (error || !freePlan) {
    return { error };
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    limit: 1,
    status: "all",
    expand: ["data.default_payment_method"],
  });

  if (subscriptions.data.length === 0) {
    const stripeTablePromise = db
      .update(stripeTable)
      .set({
        subscriptionId: null,
        status: null,
        priceId: null,
        currentPeriodStart: null,
        currentPeriodEnd: null,
        cancelAtPeriodEnd: null,
        paymentMethodBrand: null,
        paymentMethodLast4: null,
      })
      .where(eq(stripeTable.customerId, customerId));

    const customersTablePromise = db
      .update(customersTable)
      .set({ subscriptionType: freePlan.name })
      .where(eq(customersTable.customerId, customerId));

    await Promise.all([stripeTablePromise, customersTablePromise]);

    const error = new Error("Subscription not found");
    console.error(error);
    return { error: error.message };
  }

  const subscription = subscriptions.data[0];

  const stripeTablePromise = db
    .update(stripeTable)
    .set({
      subscriptionId: subscription.id,
      status: subscription.status,
      priceId: subscription.items.data[0].price.id,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      paymentMethodBrand:
        typeof subscription.default_payment_method !== "string"
          ? (subscription.default_payment_method?.card?.brand ?? null)
          : null,
      paymentMethodLast4:
        typeof subscription.default_payment_method !== "string"
          ? (subscription.default_payment_method?.card?.last4 ?? null)
          : null,
    })
    .where(eq(stripeTable.customerId, customerId));

  let subscriptionType =
    stripeConfig.plans.find(
      (plan) => plan.priceId === subscription.items.data[0].price.id,
    )?.name ?? freePlan.name;
  if (subscription.status !== "active" && subscription.status !== "trialing") {
    subscriptionType = freePlan.name;
  }

  const customersTablePromise = db
    .update(customersTable)
    .set({ subscriptionType })
    .where(eq(customersTable.customerId, customerId));

  await Promise.all([stripeTablePromise, customersTablePromise]);

  return {};
}
