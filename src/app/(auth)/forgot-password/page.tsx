"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/zod/schemas/ForgotPasswordSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormAlert from "@/components/FormAlert";

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(formData: z.infer<typeof ForgotPasswordSchema>) {
    setError(null);

    startTransition(async () => {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const { message } = await response.json();
        setSuccess(message);
        form.reset();
      } else {
        const { error } = await response.json();
        setError(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex min-h-screen items-center justify-center bg-card xs:bg-background"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="w-full max-w-sm border-transparent px-2 shadow-none xs:border-border xs:shadow-sm">
          <CardHeader className="pb-9">
            <CardTitle className="text-2xl">Reset password</CardTitle>
            <CardDescription>
              Enter your email to change your password
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="email"
                      placeholder="marcos@example.com"
                      autoComplete="email"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-col gap-6">
            <Button type="submit" className="w-full" disabled={isPending}>
              Send reset link
            </Button>

            {error && <FormAlert variant="destructive" message={error} />}
            {success && <FormAlert variant="success" message={success} />}

            <div className="mt-2.5 text-center text-sm">
              Remember your password?{" "}
              <Link href="/sign-in" className="underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
