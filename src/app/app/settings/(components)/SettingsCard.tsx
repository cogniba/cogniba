interface SettingsCardProps {
  children: React.ReactNode;
}

export default function SettingsCard({ children }: SettingsCardProps) {
  return (
    <div className="flex w-full max-w-6xl flex-col divide-y divide-slate-200 rounded-lg border border-slate-200/80 bg-white p-8 shadow-sm *:py-8 first:*:pt-0 last:*:pb-0 dark:divide-slate-800 dark:border-slate-800/80 dark:bg-slate-900/30 dark:shadow-md dark:shadow-black/50">
      {children}
    </div>
  );
}
