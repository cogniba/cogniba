"use client";

import Link from "next/link";
import handleSignIn from "@/server-actions/auth/handleSignIn";
import * as z from "zod";

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
import { useForm } from "react-hook-form";
import { SignInSchema } from "@/zod/schemas/SignInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormAlert from "@/components/FormAlert";
import { useState, useTransition } from "react";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof SignInSchema>) {
    setError(null);
    setSuccess(null);

    startTransition(() => {
      handleSignIn(data).then((result) => {
        if (result) {
          setError(result.error ?? null);
          setSuccess(result.success ?? null);
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950"
        onSubmit={form.handleSubmit(onSubmit)}
        // action={handleSubmitSignIn}
      >
        <Card className="w-full max-w-sm space-y-1 bg-white dark:bg-slate-900/30">
          <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to sign in to your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        id="username"
                        name="username"
                        type="text"
                        placeholder="marcoshernanz123"
                        autoComplete="username"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel htmlFor="Password">Password</FormLabel>
                      <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                        tabIndex={-1}
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        id="password"
                        name="password"
                        type="password"
                        // placeholder="••••••••"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-6">
            <Button type="submit" className="w-full" disabled={isPending}>
              Sign In
            </Button>

            {error && <FormAlert variant="destructive" message={error} />}
            {success && <FormAlert variant="success" message={success} />}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
