"use client";

import FormAlert from "@/components/FormAlert";
import LoaderWrapper from "@/components/LoaderWrapper";
import SimpleMessageScreen from "@/components/SimpleMessageScreen";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangePasswordSchema } from "@/zod/schemas/ChangePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ChangePasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [passwordChanged, setPasswordChanged] = useState(false);

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(formData: z.infer<typeof ChangePasswordSchema>) {
    setError(null);

    startTransition(async () => {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setPasswordChanged(true);
      } else {
        const { error } = await response.json();
        setError(error);
      }
    });
  }

  if (passwordChanged) {
    return (
      <SimpleMessageScreen
        mainMessage={<>Password changed successfully</>}
        secondaryMessage={
          <>
            <Link href="/app" className="underline">
              &larr; Back to app
            </Link>
          </>
        }
      />
    );
  }

  return (
    <Form {...form}>
      <form
        className="flex min-h-screen items-center justify-center bg-card xs:bg-background"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="w-full max-w-sm border-transparent px-2 shadow-none xs:border-border xs:shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Change password</CardTitle>
            <CardDescription>
              Choose a new password for your account
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="password"
                      autoComplete="new-password"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="password"
                      autoComplete="new-password"
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
              <LoaderWrapper loading={isPending}>Change password</LoaderWrapper>
            </Button>

            {error && <FormAlert variant="destructive" message={error} />}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
