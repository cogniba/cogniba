"use server";

import { db } from "@/database";
import type { CustomerType } from "@/database/schemas/customersTable";
import { customersTable } from "@/database/schemas/customersTable";
import getUserOrError from "@/lib/auth/getUserOrError";
import { err, ok, type Result } from "@/lib/result";
import { eq } from "drizzle-orm";

export default async function getCustomer(): Promise<Result<CustomerType>> {
  const userResult = await getUserOrError();
  if (userResult.error) {
    return err(userResult.error);
  }

  const { data: user } = userResult;
  if (!user) {
    return err("Failed to get user");
  }

  try {
    const customer = await db
      .select()
      .from(customersTable)
      .where(eq(customersTable.userId, user.id))
      .then((res) => (res.length === 1 ? res[0] : null));
    if (!customer) {
      return err("Customer not found");
    }

    return ok(customer);
  } catch (error) {
    console.error(error);
    return err("An unexpected error occurred");
  }
}
