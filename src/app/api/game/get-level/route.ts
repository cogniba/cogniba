import getLevelRequest from "@/lib/server/game/getLevelRequest";

export async function GET() {
  return await getLevelRequest();
}
