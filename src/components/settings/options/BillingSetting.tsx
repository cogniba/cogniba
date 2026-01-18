import redirectToError from "@/actions/redirectToError";
import createCustomerPortal from "@/actions/stripe/createCustomerPortal";
import SettingsItem from "@/components/settings/SettingsItem";
import getEnv from "@/lib/env";

export default async function BillingSetting() {
  const { url: customerPortalUrl } = await createCustomerPortal({
    return_url: `${getEnv("NEXT_PUBLIC_SITE_URL")}/app/settings`,
  });

  if (!customerPortalUrl) {
    return redirectToError("Failed to create customer portal");
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
