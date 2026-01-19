import getGamesData from "@/actions/analytics/getGamesData";
import SimpleMessageScreen from "@/components/SimpleMessageScreen";
import AnalyticsContextProvider from "@/context/AnalyticsContext";

type AnalyticsLayoutProps = {
  children: React.ReactNode;
};

export default async function AnalyticsLayout({
  children,
}: AnalyticsLayoutProps) {
  const { data, error } = await getGamesData({ frequency: "daily" });
  if (error || !data) {
    return <SimpleMessageScreen mainMessage="Failed to load data" />;
  }

  return (
    <AnalyticsContextProvider data={data}>{children}</AnalyticsContextProvider>
  );
}
