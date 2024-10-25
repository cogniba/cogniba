import getUserLevel from "@/lib/server/getUserLevel";

export async function GET() {
  return await getUserLevel();
}
