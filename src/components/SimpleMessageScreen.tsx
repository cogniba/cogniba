import { cn } from "@/lib/cn";

interface SimpleMessageScreenProps {
  mainMessage: React.ReactNode;
  secondaryMessage?: React.ReactNode;
  variant?: "normal" | "error";
}

export default function SimpleMessageScreen({
  mainMessage,
  secondaryMessage,
  variant = "normal",
}: SimpleMessageScreenProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center p-4",
        variant === "error" && "bg-destructive text-destructive-foreground",
      )}
    >
      <div className="flex h-full max-w-3xl flex-col items-center justify-center gap-6 text-center">
        <div className="text-2xl sm:text-3xl">{mainMessage}</div>
        {secondaryMessage && (
          <div
            className={cn(
              "text-xl text-muted-foreground sm:text-2xl",
              variant === "error" && "text-destructive-foreground/85",
            )}
          >
            {secondaryMessage}
          </div>
        )}
      </div>
    </div>
  );
}
