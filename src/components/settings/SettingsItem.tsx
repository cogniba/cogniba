"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OptionalLink from "../OptionalLink";

type SettingsItemProps =
  | {
      title: string;
      description: string;
      type: "select";
      options: { value: string; label: string }[];
      value: string;
      onValueChange: (value: string) => void;
      disabled?: boolean;

      buttonText?: never;
      onClick?: never;
      href?: never;
    }
  | {
      title: string;
      description: string;
      type: "button";
      buttonText: string;
      onClick: () => void;
      disabled?: boolean;

      href?: never;
      options?: never;
      value?: never;
      onValueChange?: never;
    }
  | {
      title: string;
      description: string;
      type: "button";
      buttonText: string;
      href?: string;
      disabled?: boolean;

      onClick?: never;
      options?: never;
      value?: never;
      onValueChange?: never;
    };

export default function SettingsItem({
  title,
  description,
  type,
  options,
  value,
  onValueChange,
  buttonText,
  onClick,
  href,
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
      <div className="w-full flex-shrink-0 md:w-60 lg:w-80">
        {type === "select" && (
          <Select
            value={value}
            onValueChange={onValueChange}
            disabled={disabled}
          >
            <SelectTrigger>
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
        )}
        {type === "button" && (
          <Button
            onClick={onClick}
            disabled={disabled}
            variant="outline"
            className="w-full"
          >
            <OptionalLink href={href}>{buttonText}</OptionalLink>
          </Button>
        )}
      </div>
    </div>
  );
}
