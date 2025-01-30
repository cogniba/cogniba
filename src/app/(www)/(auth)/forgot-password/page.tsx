"use client";

import { useState, useTransition } from "react";
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
import LoaderWrapper from "@/components/LoaderWrapper";
import forgotPassword from "@/actions/auth/forgotPassword";

export default function ForgotPasswordPage() {
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

    startTransition(async () => {
      const { error } = await forgotPassword(formData);

      if (!error) {
        setHasSentEmail(true);
      } else {
        setError(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex h-full w-full items-center justify-center bg-card py-5 xs:bg-background"
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
