import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chartMetrics } from "./Analytics";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/cn";

import type { DateRange } from "react-day-picker";
import type { Dispatch, SetStateAction } from "react";

interface AnalyticsFiltersProps {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  chartMetric: chartMetrics;
  setChartMetric: Dispatch<SetStateAction<chartMetrics>>;
}

export default function AnalyticsFilters({
  date,
  setDate,
  chartMetric,
  setChartMetric,
}: AnalyticsFiltersProps) {
  return (
    <div className="sm:flex-row flex flex-col items-center justify-between gap-3">
      <div className="sm:w-fit lg:flex-row flex w-full flex-col items-center justify-start gap-3">
        <Select
          value={chartMetric ?? undefined}
          onValueChange={(value) => setChartMetric(value as chartMetrics)}
        >
          <SelectTrigger className="sm:w-52 md:w-64 w-full">
            <SelectValue placeholder="Select a metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="level">Level</SelectItem>
            <SelectItem value="accuracy">Accuracy</SelectItem>
            <SelectItem value="stats">Stats</SelectItem>
            <SelectItem value="gamesPlayed">Games played</SelectItem>
            <SelectItem value="timePlayed">Time played</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "sm:w-64 flex w-full items-center justify-start gap-2 font-normal",
              !date && "text-slate-800",
            )}
            variant="outline"
          >
            <CalendarIcon className="h-4 w-4" />
            {date?.from ? (
              date?.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Select a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="end">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            disabled={(date) => date > new Date() || date < new Date(2020, 0)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}