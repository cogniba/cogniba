import Analytics from "./(components)/Analytics";

export default async function AnalyticsPage() {
  // const data = getUserDailyGamesData();
  // TODO get Data

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="sm:mx-10 flex h-full w-full max-w-7xl flex-col items-center gap-5 xs:mx-6 xs:py-10">
        <Analytics
          userData={userData}
          childrenData={childrenData}
          userChildren={children}
        />
      </div>
    </div>
  );
}
