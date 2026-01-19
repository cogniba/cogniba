import { db } from "@/database";
import { customersTable } from "@/database/schemas/customersTable";
import { profilesTable } from "@/database/schemas/profilesTable";
import getFreePlan from "@/lib/stripe/getFreePlan";
import { eq } from "drizzle-orm";

export type CustomerProfile = {
  userId: string;
  email: string;
  fullName: string;
  customerId: string | null;
  subscriptionType: string;
};

export async function getCustomerProfile(userId: string) {
  const query = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.userId, userId))
    .fullJoin(customersTable, eq(profilesTable.userId, customersTable.userId))
    .then((rows) => (rows.length === 1 ? rows[0] : null));

  if (!query?.profiles) {
    return null;
  }

  const { freePlan } = getFreePlan();

  return {
    userId: query.profiles.userId,
    email: query.profiles.email,
    fullName: query.profiles.fullName,
    customerId: query.customers?.customerId ?? null,
    subscriptionType: query.customers?.subscriptionType ?? freePlan?.name ?? "",
  } satisfies CustomerProfile;
}
