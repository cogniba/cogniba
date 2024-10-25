import getSettings from "@/lib/server/settings/getSettings";

export async function GET() {
  return await getSettings();
}
