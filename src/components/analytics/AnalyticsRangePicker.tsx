import { Check, ChevronsUpDown, LockIcon } from "lucide-react";
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
import subscriptionConfig from "@/config/subscriptionConfig";
import { useAuthContext } from "@/context/AuthContext";
import UpgradeDialog from "../UpgradeDialog";
import { usePostHog } from "posthog-js/react";

const defaultOptions = [
  { label: "Last 7 days", value: "last 7 days" },
  { label: "Last 30 days", value: "last 30 days" },
  { label: "Last 3 months", value: "last 3 months" },
  { label: "Last 12 months", value: "last 12 months" },
];

export default function AnalyticsRangePicker() {
  const posthog = usePostHog();
  const { setDate } = useAnalyticsContext();
  const { subscriptionType, status } = useAuthContext();
  const { limits } = subscriptionConfig;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("last 7 days");
  const [search, setSearch] = useState("");

  const isFreeUser = subscriptionType === "Free" || status === "loading";

  const calculateDays = (number: number, unit: string) => {
    if (unit === "day" || unit === "days") {
      return number;
    } else if (unit === "week" || unit === "weeks") {
      return number * 7;
    } else if (unit === "month" || unit === "months") {
      return number * 30;
    } else if (unit === "year" || unit === "years") {
      return number * 365;
    }

    return number;
  };

  const getOptions = useCallback(() => {
    const currentOption = value
      ? {
          label: value.charAt(0).toUpperCase() + value.slice(1),
          value,
        }
      : null;
    let options = [...defaultOptions];

    const separatedSearch = search.trim().length
      ? search.trim().split(" ")
      : [];

    if (separatedSearch.length > 3) {
      options = [];
    } else if (separatedSearch.length !== 0) {
      const numberTerms = separatedSearch.filter(
        (term) => !isNaN(parseInt(term)),
      );

      if (numberTerms.length === 1) {
        const number = parseInt(numberTerms[0] ?? "0");
        const newOptions = [
          {
            label: `Last ${String(number)} ${number === 1 ? "day" : "days"}`,
            value: `last ${String(number)} ${number === 1 ? "day" : "days"}`,
          },
          {
            label: `Last ${String(number)} ${number === 1 ? "week" : "weeks"}`,
            value: `last ${String(number)} ${number === 1 ? "week" : "weeks"}`,
          },
          {
            label: `Last ${String(number)} ${number === 1 ? "month" : "months"}`,
            value: `last ${String(number)} ${number === 1 ? "month" : "months"}`,
          },
          {
            label: `Last ${String(number)} ${number === 1 ? "year" : "years"}`,
            value: `last ${String(number)} ${number === 1 ? "year" : "years"}`,
          },
        ];
        options = [...newOptions];
      }
    }

    if (
      currentOption &&
      !options.some((opt) => opt.value === currentOption.value)
    ) {
      options = [currentOption, ...options];
    }

    const extendedOptions = options.map((option) => {
      const parts = option.value.split(" ");
      const number = parseInt(parts[1] ?? "0");
      const unit = parts[2] ?? "days";
      const totalDays = calculateDays(number, unit);

      if (totalDays > limits.analyticsDaysLimit && isFreeUser) {
        return { ...option, isAllowed: false };
      } else {
        return { ...option, isAllowed: true };
      }
    });

    return extendedOptions;
  }, [isFreeUser, limits.analyticsDaysLimit, search, value]);

  const options = getOptions();

  const calculateDateRange = (value: string) => {
    const parts = value.split(" ");
    const number = parseInt(parts[1] ?? "0");
    const unit = parts[2] ?? "days";
    const today = new Date();

    const totalDays = calculateDays(number, unit);

    if (totalDays > 365 * 5) {
      setDate({ from: subYears(today, 10), to: today });
      setValue("last 5 years");
      return;
    }

    let startDate = today;

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
      <PopoverContent className="p-0 sm:w-64">
        <Command>
          <CommandInput
            placeholder="Search time range..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandEmpty>No range found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <UpgradeDialog
                key={option.value}
                title="Plan Limit Exceeded"
                description="Your selected date range exceeds your current plan limit. Upgrade to Pro to unlock full analytics history and deeper insights."
                className="w-full"
                active={!option.isAllowed}
              >
                <CommandItem
                  value={option.value}
                  onSelect={(currentValue) => {
                    if (!option.isAllowed) {
                      posthog.capture("upgrade_dialog_open", {
                        source: "analytics_range_picker",
                        option_value: option.value,
                      });
                      return;
                    }

                    setValue(currentValue);
                    calculateDateRange(currentValue);
                    setOpen(false);
                  }}
                  className={cn(
                    "cursor-pointer",
                    !option.isAllowed && "opacity-50",
                  )}
                >
                  {!option.isAllowed ? (
                    <LockIcon className="mr-2 h-4 w-4" />
                  ) : (
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  )}
                  {option.label}
                </CommandItem>
              </UpgradeDialog>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
