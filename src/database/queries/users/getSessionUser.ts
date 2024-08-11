import { auth } from "@/auth/auth";

type SessionUserType = {
  name: string;
  email: string;

  id: string;
  role: "child" | "parent" | "admin";
  username: string;

  hasFinishedTutorial: boolean;
};

export default async function getSessionUser(): Promise<SessionUserType> {
  const session = await auth();

  const user = session?.user;
  if (!user) {
    throw new Error("No user");
  }

  return user as SessionUserType;
}
