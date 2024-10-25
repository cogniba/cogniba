import getMaxLevel from "@/lib/server/game/getMaxLevel";

export async function GET() {
  return await getMaxLevel();
}
