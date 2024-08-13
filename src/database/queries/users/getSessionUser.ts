import { auth } from "@/auth/auth";
import { RoleType } from "@/database/schemas/auth";

type SessionUserType = {
  name: string;
  email: string;

  id: string;
  role: RoleType;
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
