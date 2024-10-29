interface SimpleMessagePageProps {
  mainMessage: React.ReactNode;
  secondaryMessage: React.ReactNode;
}

export default function SimpleMessagePage({
  mainMessage,
  secondaryMessage,
}: SimpleMessagePageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex h-full max-w-3xl flex-col items-center justify-center gap-6 text-center">
        <div className="text-2xl sm:text-3xl">{mainMessage}</div>
        <div className="text-xl text-muted-foreground sm:text-2xl">
          {secondaryMessage}
        </div>
      </div>
    </div>
  );
}
