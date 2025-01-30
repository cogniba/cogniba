import createCustomerPortal from "@/actions/stripe/createCustomerPortal";
import SettingsItem from "@/components/settings/SettingsItem";
import { redirect } from "next/navigation";

export default async function BillingSetting() {
  const { url: customerPortalUrl } = await createCustomerPortal({
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/app/settings`,
  });

  if (!customerPortalUrl) {
    const error = new Error("Failed to create customer portal");
    console.error(error);

    const errorUrl = new URL("/error", origin);
    errorUrl.searchParams.set("message", error.message);
    redirect(errorUrl.toString());
  }

  return (
    <SettingsItem
      title="Billing"
      description="Manage your billing information"
      type="button"
      buttonText="Manage Billing"
      href={customerPortalUrl}
    />
  );
}
