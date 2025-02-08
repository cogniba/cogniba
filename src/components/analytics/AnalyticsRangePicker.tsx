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
// import { subDays, subMonths, subWeeks, subYears } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/cn";

const defaultOptions = [
  { label: "Last 7 days", value: "last 7 days" },
  { label: "Last 30 days", value: "last 30 days" },
  { label: "Last 3 months", value: "last 3 months" },
  { label: "Last 12 months", value: "last 12 months" },
];

export default function AnalyticsRangePicker() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  const getOptions = (search: string) => {
    const separatedSearch = search.trim().length
      ? search.trim().split(" ")
      : [];

    if (separatedSearch.length > 3) {
      return [];
    } else if (separatedSearch.length === 0) {
      return defaultOptions;
    } else {
      const numberTerms = separatedSearch.filter(
        (term) => !isNaN(parseInt(term)),
      );

      if (numberTerms.length === 1) {
        const number = parseInt(numberTerms[0]);
        return [
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
      }
      return defaultOptions;
    }
  };

  const options = getOptions(search);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select range..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
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
                  // calculateDateRange(currentValue);
                  setOpen(false);
                }}
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
