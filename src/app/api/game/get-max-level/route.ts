import getMaxLevelRequest from "@/lib/server/game/getMaxLevelRequest";

export async function GET() {
  return await getMaxLevelRequest();
}
