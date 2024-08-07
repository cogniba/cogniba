import getUserDailyGamesData from "@/database/queries/games/getUserDailyGamesData";
import Analytics from "./(components)/Analytics";
import getUserChildren from "@/database/queries/users/getUserChildren";
import getChildrenDailyGamesData from "@/database/queries/games/getChildrenDailyGamesData";

export default async function AnalyticsPage() {
  const children = await getUserChildren();
  const isParent = children.length > 0;

  const userData = !isParent ? await getUserDailyGamesData() : null;
  const childrenData = isParent
    ? await getChildrenDailyGamesData(children)
    : null;

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-full w-full max-w-7xl flex-col items-center gap-5 xs:mx-6 xs:py-10 sm:mx-10">
        <Analytics
          userData={userData}
          childrenData={childrenData}
          userChildren={children}
        />
      </div>
    </div>
  );
}
