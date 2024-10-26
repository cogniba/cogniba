import getMaxLevelRequest from "@/lib/server/game/getMaxLevel";

export async function GET() {
  return await getMaxLevelRequest();
}
