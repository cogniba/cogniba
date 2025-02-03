import redirectToError from "@/actions/redirectToError";
import createCustomerPortal from "@/actions/stripe/createCustomerPortal";
import SettingsItem from "@/components/settings/SettingsItem";

export default async function BillingSetting() {
  const { url: customerPortalUrl } = await createCustomerPortal({
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/app/settings`,
  });

  if (!customerPortalUrl) {
    redirectToError("Failed to create customer portal");
    return;
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
