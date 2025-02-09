"use client";

import AnalyticsFilters from "./AnalyticsFilters";
import AnalyticsMetrics from "./AnalyticsMetricCharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Analytics() {
  return (
    <Card className="flex h-full w-full flex-col pb-4 pt-8 xs:py-0">
      <CardHeader className="border-b p-5 sm:p-8">
        <AnalyticsFilters />
      </CardHeader>
      <CardContent className="flex h-full flex-col p-5 sm:p-8">
        <AnalyticsMetrics />
      </CardContent>
    </Card>
  );
}
