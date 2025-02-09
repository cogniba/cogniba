import Analytics from "@/components/analytics/Analytics";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-full w-full max-w-7xl flex-col items-center gap-5 xs:mx-6 xs:py-10 sm:mx-10">
        <Analytics />
      </div>
    </div>
  );
}
