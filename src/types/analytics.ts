import { ChartConfig } from "@/components/ui/chart";

export interface BaseChartConfig {
  title: string;
  description: string;
  names: string[];
  chartConfig: ChartConfig;
}

export interface ChartWithPostfix extends BaseChartConfig {
  postfix: string;
}

export type ChartConfiguration = BaseChartConfig | ChartWithPostfix;

export type ChartsConfig = {
  [key: string]: ChartConfiguration;
};
