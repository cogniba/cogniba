"use server";

import { db } from "@/database";
import { gamesTable } from "@/database/schemas/gamesTable";
import getUserOrError from "@/lib/auth/getUserOrError";
import { err, ok, type Result } from "@/lib/result";
import type { GameInsertSchemaType } from "@/zod/schemas/GameInsertSchema";
import { GameInsertSchema } from "@/zod/schemas/GameInsertSchema";
import { revalidatePath } from "next/cache";

export default async function insertGame(
  input: GameInsertSchemaType,
): Promise<Result<{ success: true }>> {
  const parsed = GameInsertSchema.safeParse(input);
  if (!parsed.success) {
    return err("Invalid game payload");
  }

  const userResult = await getUserOrError();
  if (userResult.error) {
    return err(userResult.error);
  }

  const { data: user } = userResult;
  if (!user) {
    return err("Failed to get user");
  }

  try {
    await db.insert(gamesTable).values({
      ...parsed.data,
      userId: user.id,
    });

    revalidatePath("/app/play");
    revalidatePath("/app/analytics");

    return ok({ success: true });
  } catch (error) {
    console.error("Error inserting game:", error);
    return err("Internal server error");
  }
}
