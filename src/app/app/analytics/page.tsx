import Analytics from "@/components/analytics/Analytics";

export const dynamic = "force-dynamic";

export default function AnalyticsPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="xs:mx-6 xs:py-10 flex h-full w-full max-w-7xl flex-col items-center gap-5 sm:mx-10">
        <Analytics />
      </div>
    </div>
  );
}
