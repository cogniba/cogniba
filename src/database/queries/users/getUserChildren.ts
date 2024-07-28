import { db } from "@/database/db";
import getUser from "./getUser";
import { users } from "@/database/schemas/auth";
import { eq } from "drizzle-orm";

export default async function getUserChildren() {
  const { id: userId, role } = await getUser();

  if (!userId) {
    throw new Error("User not found");
  }

  if (role !== "parent") {
    return [];
  }

  const children = await db
    .select()
    .from(users)
    .where(eq(users.parentId, userId));

  return children;
}
