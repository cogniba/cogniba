import AppHeader from "./(components)/AppHeader";

interface AppLayoutProps {
  readonly children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <AppHeader />
      <main className="h-full w-full bg-slate-50">{children}</main>
    </div>
  );
}
