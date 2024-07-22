import { auth } from "@/auth/auth";

export default async function getUserId() {
  const session = await auth();

  const userId = session?.user.id;
  if (!userId) {
    throw new Error("User not found");
  }

  return userId;
}
