"use server";

import { db } from "@/database";
import { customersTable } from "@/database/schemas/customersTable";
import { profilesTable } from "@/database/schemas/profilesTable";
import createNewCustomer from "@/lib/stripe/createNewCustomer";
import stripe from "@/lib/stripe/stripe";
import createClient from "@/lib/supabase/server";
import { eq } from "drizzle-orm";

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
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      const error = new Error("User not found");
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
