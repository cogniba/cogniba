import { db } from "@/database";
import { customersTable } from "@/database/schemas/customersTable";
import syncStripeData from "@/lib/stripe/syncStripeData";
import createClient from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SuccessScreen } from "@/components/SuccessScreen";

export default async function SuccessPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    const error = new Error("Failed to load user data");
    console.error(error);

    const errorUrl = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/error`);
    errorUrl.searchParams.set("message", error.message);
    redirect(errorUrl.toString());
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
    const errorUrl = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/error`);
    errorUrl.searchParams.set("message", "Failed to sync Stripe data");
    redirect(errorUrl.toString());
  }

  return (
    <Suspense fallback={<SuccessScreen />}>
      <SuccessScreen redirect />
    </Suspense>
  );
}
