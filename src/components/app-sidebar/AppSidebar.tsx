import { UserType } from "@/database/schemas/profilesTable";
import AppSidebarContent from "@/components/app-sidebar/AppSidebarContent";
import getUserRequest from "@/lib/server/auth/getUserRequest";

export default async function AppSidebar() {
  const response = await getUserRequest();
  if (!response.ok) {
    return <div>An error has ocurred</div>;
  }

  const user: UserType = await response.json();

  return <AppSidebarContent full_name={user.full_name} email={user.email} />;
}
