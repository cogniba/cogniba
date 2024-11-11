"use client";

import { cn } from "@/lib/cn";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Portal } from "../ui/Portal";

export default function MobileSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSidebarOpen]);

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen((open) => !open)}
        className="z-50"
      >
        <div className="relative h-7 w-7">
          <MenuIcon
            className={cn(
              "absolute size-7 opacity-100 transition duration-300",
              isSidebarOpen && "rotate-180 opacity-0",
            )}
          />
          <XIcon
            className={cn(
              "absolute size-7 opacity-0 transition duration-300",
              isSidebarOpen && "rotate-180 opacity-100",
            )}
          />
        </div>
      </button>

      <Portal>
        <nav
          className={cn(
            "pointer-events-auto fixed inset-0 z-40 flex h-screen w-screen flex-col justify-between bg-background/90 pt-28 text-lg font-semibold backdrop-blur-xl transition-all duration-300",
            !isSidebarOpen &&
              "invisible -translate-y-8 scale-110 opacity-0 blur-xl",
          )}
        >
          <div className="grid divide-y px-6 *:py-2 first:*:pt-0 last:*:pb-0">
            <Link href="/research">
              <Button variant="ghost" className="w-full justify-start text-lg">
                Research
              </Button>
            </Link>
            <Link href="/faq">
              <Button variant="ghost" className="w-full justify-start text-lg">
                FAQs
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="ghost" className="w-full justify-start text-lg">
                Blog
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" className="w-full justify-start text-lg">
                Pricing
              </Button>
            </Link>
          </div>
          <div className="flex w-full gap-3 bg-white px-6 py-4 dark:bg-black/30">
            <Button variant="secondary" className="w-full">
              Sign In
            </Button>
            <Button className="w-full">Get Started</Button>
          </div>
        </nav>
      </Portal>
    </>
  );
}
