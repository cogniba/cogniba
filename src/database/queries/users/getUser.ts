import { auth } from "@/auth/auth";
import { UserType } from "@/database/schemas/auth";

export default async function getUser(): Promise<UserType> {
  const session = await auth();

  const user = session?.user;
  if (!user) {
    throw new Error("No user");
  }

  return user as UserType;
}
