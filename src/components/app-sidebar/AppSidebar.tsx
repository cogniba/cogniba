import { UserType } from "@/database/schemas/profilesTable";
import AppSidebarContent from "@/components/app-sidebar/AppSidebarContent";
import getUserRequest from "@/lib/server/auth/getUserRequest";
import SimpleMessageScreen from "../SimpleMessageScreen";

export default async function AppSidebar() {
  const response = await getUserRequest();
  if (!response.ok) {
    return (
      <SimpleMessageScreen
        mainMessage="Error getting settings"
        secondaryMessage="Please, reload the page to try again"
        variant="error"
      />
    );
  }

  const { user }: { user: UserType } = await response.json();

  return <AppSidebarContent fullName={user.fullName} email={user.email} />;
}
