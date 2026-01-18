import type { ChartConfig } from "@/components/ui/chart";

export type BaseChartConfig = {
  title: string;
  description: string;
  names: string[];
  chartConfig: ChartConfig;
}

export type ChartWithPostfix = {
  postfix: string;
} & BaseChartConfig

export type ChartConfiguration = BaseChartConfig | ChartWithPostfix;

export type ChartsConfig = Record<string, ChartConfiguration>;
