import getSettingsRequest from "@/lib/server/settings/getSettingsRequest";

export const dynamic = "force-dynamic";

export async function GET() {
  return await getSettingsRequest();
}
