"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SettingsItemProps {
  title: string;
  description: string;
  options: { value: string; label: string }[];
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export default function SettingsItem({
  title,
  description,
  options,
  value,
  onValueChange,
  disabled = false,
}: SettingsItemProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center md:gap-8">
      <div className="flex flex-col gap-0.5">
        <span className="text-lg font-semibold text-slate-950 dark:text-slate-50 md:text-xl">
          {title}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {description}
        </span>
      </div>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="w-full flex-shrink-0 md:w-60 lg:w-80">
          <SelectValue></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
