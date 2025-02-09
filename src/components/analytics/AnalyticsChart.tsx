import ChartNoData from "@/components/ChartNoData";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAnalyticsContext } from "@/context/AnalyticsContext";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfiguration, ChartWithPostfix } from "@/types/analytics";

export default function AnalyticsChart() {
  const { cleanData, chartMetric, charts } = useAnalyticsContext();
  const currentChart = charts[chartMetric];

  const hasPostfix = (chart: ChartConfiguration): chart is ChartWithPostfix => {
    return "postfix" in chart;
  };

  return (
    <>
      <CardHeader className="mb-4 flex flex-col justify-center px-0 pt-0">
        <CardTitle>{currentChart.title}</CardTitle>
        <CardDescription>{currentChart.description}</CardDescription>
      </CardHeader>
      {cleanData ? (
        <ChartContainer
          className="aspect-auto h-full w-full"
          config={currentChart.chartConfig}
        >
          <AreaChart data={cleanData}>
            <defs>
              {currentChart.names.map((name, index) => (
                <linearGradient
                  id={name}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                  key={index}
                >
                  <stop
                    offset="5%"
                    stopColor={`var(--color-${name})`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--color-${name})`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} opacity={0.3} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={16}
              interval="preserveStartEnd"
              // padding={{ left: 16, right: 16 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                  indicator="dot"
                  postfix={
                    hasPostfix(currentChart) ? currentChart?.postfix : undefined
                  }
                />
              }
            />
            {currentChart.names.map((name, index) => (
              <Area
                dataKey={name}
                type="monotone"
                fill={`url(#${name})`}
                stroke={`var(--color-${name})`}
                key={index}
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      ) : (
        <ChartNoData text="No data for this period" />
      )}
    </>
  );
}
