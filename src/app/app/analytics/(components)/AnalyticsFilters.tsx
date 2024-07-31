import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserType } from "@/database/schemas/auth";
import getFirstName from "@/lib/getFirstName";
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
import { DateRange } from "react-day-picker";

interface AnalyticsFiltersProps {
  userChildren: UserType[];
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  setChartMetric: (
    metric: "level" | "accuracy" | "stats" | "gamesPlayed" | "timePlayed",
  ) => void;
  selectedChild: UserType | null;
  setSelectedChild: (child: UserType) => void;
}

export default function AnalyticsFilters({
  userChildren,
  date,
  setDate,
  setChartMetric,
  selectedChild,
  setSelectedChild,
}: AnalyticsFiltersProps) {
  const isParent = userChildren.length > 0;

  return (
    <div className="flex items-center justify-between py-4">
      {isParent && (
        <Select
          onValueChange={(value) =>
            setSelectedChild(userChildren[Number(value)])
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a child" />
          </SelectTrigger>
          <SelectContent>
            {userChildren.map((child, index) => (
              <SelectItem value={String(index)} key={index}>
                {getFirstName(child.name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Select onValueChange={(value: chartMetrics) => setChartMetric(value)}>
        <SelectTrigger>
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
      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <CalendarIcon />
            {date?.from ? (
              date?.to ? (
                <>
                  {/* {format(startDate, "MM/dd/yyyy")} - {format(endDate, "MM/dd/yyyy")} */}
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
        <PopoverContent>
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
