"use server";

import createNewCustomer from "@/lib/stripe/createNewCustomer";
import stripe from "@/lib/stripe/stripe";
import getUserOrError from "@/lib/auth/getUserOrError";
import { getCustomerProfile } from "@/services/customerService";

type CreateCustomerPortalParams = {
  return_url: string;
};

export default async function createCustomerPortal({
  return_url,
}: CreateCustomerPortalParams): Promise<{
  url?: string;
  error?: string;
}> {
  try {
    const userResult = await getUserOrError();
    if (userResult.error || !userResult.data) {
      const error = new Error("User not found");
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

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url,
    });

    return portalSession.url ? { url: portalSession.url } : {};
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred" };
  }
}
