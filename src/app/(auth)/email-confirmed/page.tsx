import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EmailConfirmed() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex h-full max-w-3xl flex-col items-center justify-center gap-6 text-center">
        <div className="text-2xl sm:text-3xl">
          Email confirmed successfully!
        </div>
        <div className="text-xl text-foreground/75 sm:text-2xl">
          <Button
            variant="link"
            className="text-lg text-muted-foreground sm:text-xl"
          >
            &larr; Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}
