import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EmailConfirmed() {
  const router = useRouter();

  useEffect(() => {
    const emailConfirmed = window.localStorage.getItem("emailConfirmed");

    if (emailConfirmed === null) {
      router.replace("/sign-in");
    } else {
      window.localStorage.removeItem("emailConfirmed");
    }
  }, [router]);

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
            <Link href="/sign-in">&larr; Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
