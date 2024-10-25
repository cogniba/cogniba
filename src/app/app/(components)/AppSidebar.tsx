import { UserType } from "@/database/schemas/profilesTable";
import AppSidebarContent from "./AppSidebarContent";
import getUser from "@/lib/server/game/getUser";

export default async function AppSidebar() {
  const response = await getUser();
  if (!response.ok) {
    return <div>An error has ocurred</div>;
  }

  const user: UserType = await response.json();

  return <AppSidebarContent full_name={user.full_name} email={user.email} />;
}
