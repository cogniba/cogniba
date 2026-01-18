"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type SuccessScreenProps = {
  redirect?: boolean;
}

export function SuccessScreen({ redirect = false }: SuccessScreenProps) {
  const router = useRouter();

  useEffect(() => {
    if (!redirect) return;

    const timeout = setTimeout(() => {
      router.replace("/app");
    }, 3000);

    return () => { clearTimeout(timeout); };
  }, [router, redirect]);

  return (
    <div className="flex h-full items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight">
              Processing your payment
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            <p>Please wait while we set up your account.</p>
            <p className="mt-2 text-sm">
              You will be redirected automatically.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
