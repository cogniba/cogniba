import saltAndHashPassword from "@/lib/saltAndHashPassword";
import getUserByUsername from "@/database/queries/users/getUserByUsername";
import getUserByEmail from "./getUserByEmail";

import { db } from "@/database/db";
import {
  type RoleType,
  users,
  type UserType,
} from "@/database/schemas/profilesTable";
import { settingsTable } from "@/database/schemas/settingsTable";

interface createUserProps {
  role: RoleType;
  email: string | null;
  parentUsername: string | null;
  fullName: string;
  username: string;
  password: string;
}

export default async function createUser({
  role,
  email,
  parentUsername,
  fullName,
  username,
  password,
}: createUserProps): Promise<UserType | null> {
  const existingUsername = await getUserByUsername(username);
  if (existingUsername) {
    throw new Error("Username already exists");
  }

  if (email) {
    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
      throw new Error("Email already exists");
    }
  }

  let parentId = null;
  if (role === "child") {
    if (!parentUsername) {
      throw new Error("Parent username is required");
    }

    const parent = await getUserByUsername(parentUsername);
    if (!parent) {
      throw new Error("Parent not found");
    }

    if (parent.role !== "parent") {
      throw new Error("Parent is not a parent");
    }

    parentId = parent.id;
  }

  const hashedPassword = await saltAndHashPassword(password);

  const { settingsId } = await db
    .insert(settingsTable)
    .values({
      showFeedback: true,
      canChildrenChangeSettings: false,
    })
    .returning({ settingsId: settingsTable.id })
    .then((res) => (res.length === 1 ? res[0] : { settingsId: null }));
  if (!settingsId) {
    throw new Error("An error occurred");
  }

  return await db
    .insert(users)
    .values({
      role,
      email,
      parentId: parentId,
      name: fullName,
      username,
      password: hashedPassword,
      settingsId,
    })
    .returning()
    .then((res) => (res.length === 1 ? res[0] : null));
}
