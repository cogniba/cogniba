import getUserRequest from "@/lib/server/auth/getUserRequest";

export const dynamic = "force-dynamic";

export async function GET() {
  return await getUserRequest();
}
