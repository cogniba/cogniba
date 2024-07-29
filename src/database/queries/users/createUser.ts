"use server";

import saltAndHashPassword from "@/utils/saltAndHashPassword";
import getUserByUsername from "@/database/queries/users/getUserByUsername";
import { db } from "@/database/db";
import { users, UserType } from "@/database/schemas/auth";
import getUserByEmail from "./getUserByEmail";

interface createUserProps {
  role: "child" | "parent" | "admin";
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
  if (parentUsername) {
    const parent = await getUserByUsername(parentUsername);
    if (!parent) {
      throw new Error("Parent not found");
    }

    parentId = parent.id;
  }

  const hashedPassword = await saltAndHashPassword(password);

  return await db
    .insert(users)
    .values({
      role,
      email,
      parentId: parentId,
      name: fullName,
      username,
      password: hashedPassword,
    })
    .returning()
    .then((res) => (res.length === 1 ? res[0] : null));
}
