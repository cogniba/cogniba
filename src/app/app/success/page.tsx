import { db } from "@/database";
import { customersTable } from "@/database/schemas/customersTable";
import syncStripeData from "@/lib/stripe/syncStripeData";
import createClient from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SuccessScreen } from "@/components/SuccessScreen";
import redirectToError from "@/actions/redirectToError";

export default async function SuccessPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirectToError("Failed to load user data");
  }

  const customer = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.userId, user.id))
    .then((res) => (res.length === 1 ? res[0] : null));
  if (!customer) {
    redirect("/app");
  }

  const { error } = await syncStripeData(customer.customerId);
  if (error) {
    return redirectToError("Failed to sync Stripe data");
  }

  return (
    <Suspense fallback={<SuccessScreen />}>
      <SuccessScreen redirect />
    </Suspense>
  );
}
