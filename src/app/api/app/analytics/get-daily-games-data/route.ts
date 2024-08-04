import getDailyGamesData from "@/database/queries/games/getDailyGamesData";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const childId = searchParams.get("child-id");

  if (!childId) {
    return Response.json({ data: null });
  }

  const data = await getDailyGamesData(childId);
  return Response.json({ data });
}
