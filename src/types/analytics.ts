import type { ChartConfig } from "@/components/ui/chart";

export type BaseChartConfig = {
  title: string;
  description: string;
  names: string[];
  chartConfig: ChartConfig;
};

export type ChartWithPostfix = {
  postfix: string;
} & BaseChartConfig;

export type ChartConfiguration = BaseChartConfig | ChartWithPostfix;

export type ChartsConfig = Record<string, ChartConfiguration>;

export type GamesDataPoint = {
  userId: string;
  gamesPlayed: number;
  level: number;
  correctHits: number;
  incorrectHits: number;
  missedHits: number;
  accuracy: number;
  timePlayed: number;
  date: string;
};

export type GamesData = GamesDataPoint[];
