export default function SettingsLoading() {
  return (
    <div className="mx-6 my-10 flex flex-col items-center gap-6">
      <div className="flex w-full max-w-md flex-col divide-y rounded-lg border p-8 shadow-sm *:py-8 first:*:pt-0 last:*:pb-0 md:max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center md:gap-8">
          <div className="flex flex-col gap-0.5">
            <span className="text-lg font-semibold md:text-xl">Appearance</span>
            <span className="text-sm text-muted-foreground">
              Choose how you want the application to look
            </span>
          </div>
          <div className="w-full flex-shrink-0 md:w-60 lg:w-80">
            <div className="h-10 w-full animate-pulse rounded-md border border-input bg-secondary/30 px-3 py-2"></div>
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-md flex-col divide-y rounded-lg border p-8 shadow-sm *:py-8 first:*:pt-0 last:*:pb-0 md:max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center md:gap-8">
          <div className="flex flex-col gap-0.5">
            <span className="text-lg font-semibold md:text-xl">
              Show feedback
            </span>
            <span className="text-sm text-muted-foreground">
              You will receive feedback while playing. Recommended when starting
              out
            </span>
          </div>
          <div className="w-full flex-shrink-0 md:w-60 lg:w-80">
            <div className="h-10 w-full animate-pulse rounded-md border border-input bg-secondary/30 px-3 py-2"></div>
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-md flex-col divide-y rounded-lg border p-8 shadow-sm *:py-8 first:*:pt-0 last:*:pb-0 md:max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center md:gap-8">
          <div className="flex flex-col gap-0.5">
            <span className="text-lg font-semibold md:text-xl">
              Change password
            </span>
            <span className="text-sm text-muted-foreground">
              Change your password
            </span>
          </div>
          <div className="w-full flex-shrink-0 md:w-60 lg:w-80">
            <div className="h-10 w-full animate-pulse rounded-md border border-input bg-secondary/30"></div>
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-md flex-col divide-y rounded-lg border p-8 shadow-sm *:py-8 first:*:pt-0 last:*:pb-0 md:max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center md:gap-8">
          <div className="flex flex-col gap-0.5">
            <span className="text-lg font-semibold md:text-xl">Billing</span>
            <span className="text-sm text-muted-foreground">
              Manage your billing information
            </span>
          </div>
          <div className="w-full flex-shrink-0 md:w-60 lg:w-80">
            <div className="h-10 w-full animate-pulse rounded-md border border-input bg-secondary/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
