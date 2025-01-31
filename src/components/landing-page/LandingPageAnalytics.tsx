"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChartContainer, ChartLegend, ChartLegendContent } from "../ui/chart";
import { Area, AreaChart, CartesianGrid } from "recharts";

const chartConfig = {
  level: {
    label: "Level",
    color: "rgb(var(--primary))",
  },
};

export default function LandingPageAnalytics() {
  const initialChartData = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => {
        const level = i + 1;
        const date = new Date();
        date.setMonth(0);
        date.setDate(i + 1);
        const formattedDate = date.toISOString().slice(0, 10);

        return {
          level,
          date: formattedDate,
        };
      }),
    [],
  );

  const [chartData, setChartData] = useState(initialChartData);

  const isAnimationPlayingRef = useRef(false);

  useEffect(() => {
    if (isAnimationPlayingRef.current) {
      return;
    }

    isAnimationPlayingRef.current = true;

    const intervalId = setInterval(() => {
      setChartData((prevData) => {
        return prevData.map((day, index) => {
          const variability = Math.ceil((index + 1) / 10) * 3;
          const level = Math.max(
            1,
            index + 1 + (Math.random() - 0.5) * variability,
          );

          return {
            level,
            date: day.date,
          };
        });
      });
    }, 1500);

    return () => {
      clearInterval(intervalId);
      isAnimationPlayingRef.current = false;
    };
  }, [chartData]);

  return (
    <div className="aspect-square h-full w-full">
      <ChartContainer
        className="aspect-auto h-full w-full"
        config={chartConfig}
      >
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="level" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={`var(--color-level)`}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={`var(--color-level)`}
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} opacity={0.3} />
          {/* <XAxis
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
          /> */}
          {/* <ChartTooltip
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
          /> */}
          <Area
            dataKey="level"
            type="monotone"
            fill={`url(#level)`}
            stroke={`var(--color-level)`}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
