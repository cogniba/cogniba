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

interface UpgradeDialogProps {
  children: React.ReactNode;
  title: string;
  description: string;
  asChild?: boolean;
  active?: boolean;
}

export default function UpgradeDialog({
  children,
  title,
  description,
  asChild,
  active,
}: UpgradeDialogProps) {
  if (!active) {
    return <>{children}</>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
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
          <Link href="/app/upgrade" className="w-full">
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
