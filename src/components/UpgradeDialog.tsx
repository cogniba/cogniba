"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { SparklesIcon } from "lucide-react";
import { usePostHog } from "posthog-js/react";

interface UpgradeDialogProps {
  children: React.ReactNode;
  title: string;
  description: string;
  asChild?: boolean;
  active?: boolean;
  className?: string;
}

export default function UpgradeDialog({
  children,
  title,
  description,
  asChild,
  active,
  className,
}: UpgradeDialogProps) {
  const posthog = usePostHog();

  if (!active) {
    return <>{children}</>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild={asChild} className={className}>
        {children}
      </DialogTrigger>
      <DialogContent closeButton={true} backdrop>
        <DialogHeader>
          <DialogTitle className="mb-2 text-xl font-semibold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-foreground/80">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-5">
          <Link
            href="/app/upgrade"
            className="w-full"
            onClick={() => {
              posthog.capture("upgrade_link_clicked", {
                source: "upgrade_dialog",
                dialog_title: title,
              });
            }}
          >
            <Button className="w-full">
              <SparklesIcon />
              <span>Upgrade to Pro</span>
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
