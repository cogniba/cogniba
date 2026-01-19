type SettingsCardProps = {
  children: React.ReactNode;
};

export default function SettingsCard({ children }: SettingsCardProps) {
  return (
    <div className="flex w-full max-w-md flex-col divide-y rounded-lg border p-8 shadow-sm *:py-8 first:*:pt-0 last:*:pb-0 md:max-w-6xl">
      {children}
    </div>
  );
}
