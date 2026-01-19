"use server";

import { db } from "@/database";
import { customersTable } from "@/database/schemas/customersTable";
import { profilesTable } from "@/database/schemas/profilesTable";
import createNewCustomer from "@/lib/stripe/createNewCustomer";
import stripe from "@/lib/stripe/stripe";
import createClient from "@/lib/supabase/server";
import { eq } from "drizzle-orm";

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
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const error = new Error("You must be signed in to create a checkout.");
      console.error(error);
      return { error: error.message };
    }

    const query = await db
      .select()
      .from(profilesTable)
      .where(eq(profilesTable.userId, user.id))
      .fullJoin(customersTable, eq(profilesTable.userId, customersTable.userId))
      .then((rows) => (rows.length === 1 ? rows[0] : null));

    if (!query?.profiles) {
      const error = new Error("Profile not found");
      console.error(error);
      return { error: error.message };
    }

    const { profiles: profile, customers: customer } = query;

    let customerId = customer?.customerId;

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
