import getLevelRequest from "@/lib/server/game/getLevel";

export async function GET() {
  return await getLevelRequest();
}
