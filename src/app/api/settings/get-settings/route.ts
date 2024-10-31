import getSettingsRequest from "@/lib/server/settings/getSettingsRequest";

export async function GET() {
  return await getSettingsRequest();
}
