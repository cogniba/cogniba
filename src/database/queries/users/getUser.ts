import getSessionUser from "./getSessionUser";

import { users, type UserType } from "@/database/schemas/profiles";
import { db } from "@/database/db";
import { eq } from "drizzle-orm";

export default async function getUser(): Promise<UserType> {
  const { id } = await getSessionUser();

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then((res) => (res.length === 1 ? res[0] : null));

  if (!user) {
    throw new Error("No user");
  }

  return user;
}
