import getUserRequest from "@/lib/server/auth/getUserRequest";

export async function GET() {
  return await getUserRequest();
}
