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
}

export default function SettingsItem({
  title,
  description,
  options,
  value,
  onValueChange,
}: SettingsItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-0.5">
        <span className="text-xl font-semibold text-slate-950 dark:text-slate-50">
          {title}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {description}
        </span>
      </div>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-80">
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
