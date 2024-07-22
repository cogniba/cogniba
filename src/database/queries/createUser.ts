import saltAndHashPassword from "@/utils/saltAndHashPassword";
import getUserByUsername from "./getUserByUsername";
import { db } from "../db";
import { users } from "../schemas/auth";

export default async function createUser(
  role: "child" | "parent" | "admin",
  email: string,
  fullName: string,
  username: string,
  password: string,
) {
  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    return null;
  }

  const hashedPassword = await saltAndHashPassword(password);
  let modifiedEmail = email;
  if (role !== "parent" || !email) {
    modifiedEmail = "";
  }

  return await db
    .insert(users)
    .values({
      email: modifiedEmail,
      role,
      name: fullName,
      username,
      password: hashedPassword,
    })
    .returning()
    .then((res) => res[0] ?? null);
}
