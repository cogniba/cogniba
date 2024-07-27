import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import getDailyGamesData, {
  DailyGamesData,
} from "@/database/queries/getDailyGamesData";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  level: {
    label: "Level",
    color: "var(--orange-500)",
  },
} satisfies ChartConfig;

interface LevelChartData {
  data: DailyGamesData;
  startDate: Date;
  endDate: Date;
}

export default function LevelChart({
  data,
  startDate,
  endDate,
}: LevelChartData) {
  const filteredData = data.filter(
    (item) =>
      new Date(item.date) >= startDate && new Date(item.date) <= endDate,
  );
  return (
    <ChartContainer className="aspect-auto h-64 w-full" config={chartConfig}>
      <AreaChart data={filteredData}>
        <defs>
          <linearGradient id="fillLevel" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-level)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-level)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
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
            />
          }
        />
        <Area
          dataKey="level"
          type="monotone"
          fill="url(#fillLevel)"
          stroke="var(--color-level)"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}
