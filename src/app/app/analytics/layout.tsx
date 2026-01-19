import getGamesData from "@/actions/analytics/getGamesData";
import SimpleMessageScreen from "@/components/SimpleMessageScreen";
import AnalyticsContextProvider from "@/context/AnalyticsContext";

type AnalyticsLayoutProps = {
  children: React.ReactNode;
};

export default async function AnalyticsLayout({
  children,
}: AnalyticsLayoutProps) {
  const dataResult = await getGamesData({ frequency: "daily" });
  if (dataResult.error || !dataResult.data) {
    return <SimpleMessageScreen mainMessage="Failed to load data" />;
  }

  return (
    <AnalyticsContextProvider data={dataResult.data}>
      {children}
    </AnalyticsContextProvider>
  );
}
