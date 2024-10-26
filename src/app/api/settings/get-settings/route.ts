import getSettingsRequest from "@/lib/server/settings/getSettings";

export async function GET() {
  return await getSettingsRequest();
}
