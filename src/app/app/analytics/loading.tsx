import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2Icon } from "lucide-react";

export default function AnalyticsLoading() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="xs:mx-6 xs:py-10 flex h-full w-full max-w-7xl flex-col items-center gap-5 sm:mx-10">
        <Card className="xs:py-0 flex h-full w-full flex-col pt-8 pb-4">
          <CardHeader className="border-b p-5 sm:p-8">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <div className="flex w-full flex-col items-center justify-start gap-3 sm:w-fit lg:flex-row">
                <div className="border-input bg-secondary/30 h-10 w-full animate-pulse rounded-md border px-3 py-2 sm:w-52 md:w-64"></div>
              </div>
              <div className="border-input bg-secondary/30 h-10 w-full animate-pulse rounded-md border sm:w-64"></div>
            </div>
          </CardHeader>
          <CardContent className="flex h-full flex-col p-5 sm:p-8">
            <div className="flex h-full w-full items-center justify-center pb-20">
              <Loader2Icon className="absolute z-50 size-10 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
