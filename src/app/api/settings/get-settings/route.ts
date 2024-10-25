import getSettings from "@/lib/server/game/getSettings";

export async function GET() {
  return await getSettings();
}
