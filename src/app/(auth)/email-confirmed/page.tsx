"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function EmailConfirmed() {
  const redirectRef = useRef(true);

  const router = useRouter();

  useEffect(() => {
    const emailConfirmed = window.localStorage.getItem("emailConfirmed");

    if (emailConfirmed !== null) {
      redirectRef.current = false;
      window.localStorage.removeItem("emailConfirmed");
    }

    if (redirectRef.current) {
      router.replace("/sign-in");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex h-full max-w-3xl flex-col items-center justify-center gap-6 text-center">
        <div className="text-2xl sm:text-3xl">
          Email confirmed successfully!
        </div>
        <div className="text-xl sm:text-2xl">
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
