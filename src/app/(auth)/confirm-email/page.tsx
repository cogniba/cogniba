"use client";

import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmEmailPage() {
  const [email, setEmail] = useState<null | string>(null);
  const [name, setName] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const email = window.localStorage.getItem("signUpEmail");
    const fullName = window.localStorage.getItem("signUpFullName");

    if (email) {
      setEmail(email);
    }
    if (fullName) {
      setName(fullName?.split(" ")[0] ?? null);
    }

    window.localStorage.removeItem("signUpEmail");
    window.localStorage.removeItem("signUpFullName");

    setIsLoading(false);
  }, []);

  if (!isLoading && (!email || !name)) {
    router.push("/sign-in");
  }

  if (isLoading || !email || !name) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2Icon className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex h-full max-w-3xl flex-col items-center justify-center gap-6 text-center">
        <div className="text-2xl sm:text-3xl">
          Hey, {name}. Please confirm your email
        </div>
        <div className="text-xl text-muted-foreground sm:text-2xl">
          We have sent you a confirmation email to{" "}
          <span className="underline [word-break:break-word]">{email}</span>
        </div>
      </div>
    </div>
  );
}
