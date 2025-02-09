import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { subDays, subMonths, subWeeks, subYears } from "date-fns";
import { useCallback, useState } from "react";
import { cn } from "@/lib/cn";
import { useAnalyticsContext } from "@/context/AnalyticsContext";

const defaultOptions = [
  { label: "Last 7 days", value: "last 7 days" },
  { label: "Last 30 days", value: "last 30 days" },
  { label: "Last 3 months", value: "last 3 months" },
  { label: "Last 12 months", value: "last 12 months" },
];

export default function AnalyticsRangePicker() {
  const { setDate } = useAnalyticsContext();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("last 7 days");
  const [search, setSearch] = useState("");

  const getOptions = useCallback(() => {
    const currentOption = value
      ? {
          label: value.charAt(0).toUpperCase() + value.slice(1),
          value,
        }
      : null;

    const separatedSearch = search.trim().length
      ? search.trim().split(" ")
      : [];

    if (separatedSearch.length > 3) {
      return currentOption ? [currentOption] : [];
    } else if (separatedSearch.length === 0) {
      // Only add current option if it's not in defaultOptions
      if (
        currentOption &&
        !defaultOptions.some((opt) => opt.value === currentOption.value)
      ) {
        return [currentOption, ...defaultOptions];
      }
      return defaultOptions;
    } else {
      const numberTerms = separatedSearch.filter(
        (term) => !isNaN(parseInt(term)),
      );

      if (numberTerms.length === 1) {
        const number = parseInt(numberTerms[0]);
        const newOptions = [
          {
            label: `Last ${number} ${number === 1 ? "day" : "days"}`,
            value: `last ${number} ${number === 1 ? "day" : "days"}`,
          },
          {
            label: `Last ${number} ${number === 1 ? "week" : "weeks"}`,
            value: `last ${number} ${number === 1 ? "week" : "weeks"}`,
          },
          {
            label: `Last ${number} ${number === 1 ? "month" : "months"}`,
            value: `last ${number} ${number === 1 ? "month" : "months"}`,
          },
          {
            label: `Last ${number} ${number === 1 ? "year" : "years"}`,
            value: `last ${number} ${number === 1 ? "year" : "years"}`,
          },
        ];

        if (
          currentOption &&
          !newOptions.some((opt) => opt.value === currentOption.value)
        ) {
          return [currentOption, ...newOptions];
        }
        return newOptions;
      }

      if (
        currentOption &&
        !defaultOptions.some((opt) => opt.value === currentOption.value)
      ) {
        return [currentOption, ...defaultOptions];
      }
      return defaultOptions;
    }
  }, [search, value]);

  const options = getOptions();

  const calculateDateRange = (value: string) => {
    const parts = value.split(" ");
    const number = parseInt(parts[1]);
    const unit = parts[2];
    const today = new Date();

    let totalDays = 0;
    if (unit === "day" || unit === "days") {
      totalDays = number;
    } else if (unit === "week" || unit === "weeks") {
      totalDays = number * 7;
    } else if (unit === "month" || unit === "months") {
      totalDays = number * 30;
    } else if (unit === "year" || unit === "years") {
      totalDays = number * 365;
    }

    if (totalDays > 365 * 5) {
      setDate({ from: subYears(today, 10), to: today });
      setValue("last 5 years");
      return;
    }

    let startDate;
    if (unit === "day" || unit === "days") {
      startDate = subDays(today, number);
    } else if (unit === "week" || unit === "weeks") {
      startDate = subWeeks(today, number);
    } else if (unit === "month" || unit === "months") {
      startDate = subMonths(today, number);
    } else if (unit === "year" || unit === "years") {
      startDate = subYears(today, number);
    }

    setDate({ from: startDate, to: today });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between sm:w-64"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select range..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 sm:w-64">
        <Command>
          <CommandInput
            placeholder="Search time range..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandEmpty>No range found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue);
                  calculateDateRange(currentValue);
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
