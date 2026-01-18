import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnalyticsRangePicker from "./AnalyticsRangePicker";
import type { ChartMetrics} from "@/context/AnalyticsContext";
import { useAnalyticsContext } from "@/context/AnalyticsContext";

export default function AnalyticsFilters() {
  const { chartMetric, setChartMetric } = useAnalyticsContext();

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <div className="flex w-full flex-col items-center justify-start gap-3 sm:w-fit lg:flex-row">
        <Select
          value={chartMetric ?? undefined}
          onValueChange={(value) => { setChartMetric(value as ChartMetrics); }}
        >
          <SelectTrigger className="w-full sm:w-52 md:w-64">
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
      <AnalyticsRangePicker />
      {/* <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "flex w-full items-center justify-start gap-2 font-normal sm:w-64",
              !date && "text-muted-foreground",
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
      </Popover> */}
    </div>
  );
}
