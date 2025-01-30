import "server-only";
import stripe from "./stripe";
import { stripeTable } from "@/database/schemas/stripeTable";
import { db } from "@/database";
import { customersTable } from "@/database/schemas/customersTable";

interface CreateNewCustomerParams {
  email: string;
  userId: string;
}

export default async function createNewCustomer({
  email,
  userId,
}: CreateNewCustomerParams): Promise<{ customerId: string }> {
  const newCustomer = await stripe.customers.create({
    email,
    metadata: {
      userId,
    },
  });

  const stripeTablePromise = db
    .insert(stripeTable)
    .values({ userId, customerId: newCustomer.id });

  const customersTablePromise = db
    .insert(customersTable)
    .values({ userId: userId, customerId: newCustomer.id });

  await Promise.all([stripeTablePromise, customersTablePromise]);

  return { customerId: newCustomer.id };
}
