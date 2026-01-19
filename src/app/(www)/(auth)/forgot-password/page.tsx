"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
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
import LoaderWrapper from "@/components/LoaderWrapper";
import forgotPassword from "@/actions/auth/forgotPassword";
import { usePostHog } from "posthog-js/react";

export default function ForgotPasswordPage() {
  const posthog = usePostHog();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [hasSentEmail, setHasSentEmail] = useState(false);

  const disabled = isPending || hasSentEmail;

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(formData: z.infer<typeof ForgotPasswordSchema>) {
    setError(null);
    posthog.capture("password_reset_initiated");

    startTransition(async () => {
      const { error } = await forgotPassword(formData);

      if (!error) {
        setHasSentEmail(true);
        posthog.capture("password_reset_sent", { email: formData.email });
      } else {
        setError(error);
        posthog.capture("password_reset_error", { error });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="bg-card xs:bg-background flex h-full w-full items-center justify-center py-5"
        onSubmit={(event) => {
          void form.handleSubmit(onSubmit)(event);
        }}
      >
        <Card className="xs:border-border xs:shadow-sm w-full max-w-sm border-transparent px-2 shadow-none">
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
                      disabled={disabled}
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
            <Button type="submit" className="w-full" disabled={disabled}>
              <LoaderWrapper loading={isPending}>Send reset link</LoaderWrapper>
            </Button>

            {error && <FormAlert variant="destructive" message={error} />}
            {hasSentEmail && (
              <FormAlert
                variant="success"
                message="Please check your inbox to reset your password."
              />
            )}

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
