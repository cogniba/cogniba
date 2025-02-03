"use server";

import { db } from "@/database";
import {
  customersTable,
  CustomerType,
} from "@/database/schemas/customersTable";
import createClient from "@/lib/supabase/server";
import { eq } from "drizzle-orm";

export default async function getCustomer(): Promise<{
  customer?: CustomerType;
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

    const customer = await db
      .select()
      .from(customersTable)
      .where(eq(customersTable.userId, user.id))
      .then((res) => (res.length === 1 ? res[0] : null));
    if (!customer) {
      const error = new Error("Customer not found");
      // console.error(error);
      return { error: error.message };
    }

    return { customer };
  } catch {
    const error = new Error("An unexpected error occurred");
    console.error(error);
    return { error: error.message };
  }
}
