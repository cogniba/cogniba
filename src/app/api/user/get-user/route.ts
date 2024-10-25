import getUser from "@/lib/server/game/getUser";

export async function GET() {
  return await getUser();
}
