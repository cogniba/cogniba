import getSessionUser from "./getSessionUser";

import { db } from "@/database/db";
import { users, type UserType } from "@/database/schemas/auth";
import { eq } from "drizzle-orm";

export default async function getUserChildren(): Promise<UserType[]> {
  const { id: userId, role } = await getSessionUser();

  if (role !== "parent") {
    return [];
  }

  const children = await db
    .select()
    .from(users)
    .where(eq(users.parentId, userId))
    .orderBy(users.createdAt);

  return children;
}
