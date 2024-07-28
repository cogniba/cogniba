import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DailyGamesData } from "@/database/queries/getDailyGamesData";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

interface LevelChartProps {
  data: DailyGamesData;
  chartConfig: ChartConfig;
  title: string;
  description: string;
  names: string[];
}

export default function AnalyticsChart({
  data,
  chartConfig,
  title,
  description,
  names,
}: LevelChartProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col justify-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="aspect-auto h-64 w-full"
          config={chartConfig}
        >
          <AreaChart data={data}>
            <defs>
              {names.map((name, index) => (
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
              minTickGap={32}
              interval="preserveStartEnd"
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
            {names.map((name, index) => (
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
      </CardContent>
    </Card>
  );
}
