import saltAndHashPassword from "@/utils/saltAndHashPassword";
import getUser from "./getUser";
import { db } from "../db";
import { users } from "../schemas/users";

export default async function createUser(
  role: "child" | "parent" | "admin",
  email: string | undefined,
  fullName: string,
  username: string,
  password: string,
) {
  try {
    const existingUser = await getUser(username);
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await saltAndHashPassword(password);

    const user = await db.insert(users).values({
      role,
      email: role === "parent" ? email : null,
      name: fullName,
      username,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    return null;
  }
}
