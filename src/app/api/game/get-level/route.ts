import getLevelRequest from "@/lib/server/game/getLevelRequest";

export const dynamic = "force-dynamic";

export async function GET() {
  return await getLevelRequest();
}
