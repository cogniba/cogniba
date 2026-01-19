"use server";

import createNewCustomer from "@/lib/stripe/createNewCustomer";
import stripe from "@/lib/stripe/stripe";
import getUserOrError from "@/lib/auth/getUserOrError";
import { getCustomerProfile } from "@/services/customerService";

type CreateCheckoutSessionParams = {
  mode: "payment" | "subscription";
  priceId: string;
  successUrl: string;
  cancelUrl: string;
};

export default async function createCheckout({
  mode,
  priceId,
  successUrl,
  cancelUrl,
}: CreateCheckoutSessionParams): Promise<{
  url?: string;
  error?: string;
}> {
  try {
    const userResult = await getUserOrError();
    if (userResult.error || !userResult.data) {
      const error = new Error("You must be signed in to create a checkout.");
      console.error(error);
      return { error: error.message };
    }

    const user = userResult.data;

    const profile = await getCustomerProfile(user.id);
    if (!profile) {
      const error = new Error("Profile not found");
      console.error(error);
      return { error: error.message };
    }

    let customerId = profile.customerId;

    if (!customerId) {
      const { customerId: newCustomerId } = await createNewCustomer({
        email: profile.email,
        userId: user.id,
      });
      customerId = newCustomerId;
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: mode,
      customer: customerId,

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return checkoutSession.url ? { url: checkoutSession.url } : {};
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred" };
  }
}
