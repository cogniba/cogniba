import ChartNoData from "@/components/ChartNoData";
import AnalyticsChart from "./AnalyticsChart";

import { useAnalyticsContext } from "@/context/AnalyticsContext";

export default function AnalyticsMetrics() {
  const { chartMetric } = useAnalyticsContext();

  return (
    <>
      {chartMetric === null ? (
        <ChartNoData text="No metric selected" />
      ) : (
        <AnalyticsChart />
      )}
    </>
  );
}
