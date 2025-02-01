"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { Fragment } from "react";
import formatPathForHeader from "@/lib/formatPathForHeader";

export default function AppHeader() {
  const pathname = usePathname();
  const segments = pathname ? formatPathForHeader(pathname) : [];
  const pathParts = pathname?.split("/").filter(Boolean) || [];

  if (pathname === "/app/play") {
    return null;
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {segments?.map((segment, index) => (
              <Fragment key={index}>
                <BreadcrumbItem>
                  {index === segments.length - 1 ? (
                    <BreadcrumbPage>{segment.formatted}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={`/${pathParts.slice(0, index + 1).join("/")}`}
                    >
                      {segment.formatted}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < segments.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
