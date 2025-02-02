import { GamesData } from "@/app/api/analytics/get-data/route";
import Analytics from "@/components/analytics/Analytics";
import SimpleMessageScreen from "@/components/SimpleMessageScreen";
import getDataRequest from "@/lib/server/analytics/getDataRequest";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const response = await getDataRequest({ frequency: "daily" });

  if (!response.ok) {
    return (
      <SimpleMessageScreen
        mainMessage="Error fetching data"
        secondaryMessage="Please, reload the page to try again"
        variant="error"
      />
    );
  }

  const { data }: { data: GamesData } = await response.json();

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-full w-full max-w-7xl flex-col items-center gap-5 xs:mx-6 xs:py-10 sm:mx-10">
        <Analytics data={data} />
      </div>
    </div>
  );
}
