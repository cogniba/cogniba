import getMaxLevelRequest from "@/lib/server/game/getMaxLevelRequest";

export const dynamic = "force-dynamic";

export async function GET() {
  return await getMaxLevelRequest();
}
