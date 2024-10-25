"use client";

import { z } from "zod";

import Link from "next/link";
import FormAlert from "@/components/FormAlert";

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
import { FaGoogle } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { SignInSchema } from "@/zod/schemas/SignInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Separator } from "@/components/ui/separator";
import createClient from "@/lib/supabase/client";

export default function SignInPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof SignInSchema>) {
    setError(null);

    startTransition(() => {
      // handleSignIn(data).then((result) => {
      //   if (result) {
      //     setError(result.error ?? null);
      //   }
      // });
      // TODO: Handle sign in
    });
  }

  const handleSignInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex min-h-screen items-center justify-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="w-full max-w-sm border-transparent px-2 shadow-none xs:border-border xs:shadow-sm">
          <CardHeader className="pb-9">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <Button
              onClick={handleSignInWithGoogle}
              type="button"
              variant="outline"
              className="flex w-full items-center justify-center gap-2 bg-background font-semibold text-foreground hover:bg-muted hover:text-black"
            >
              <FaGoogle className="" />
              Continue with Google
            </Button>

            <div className="flex w-full items-center pt-2">
              <Separator className="w-full shrink" />
              <span className="px-2 text-sm">or</span>
              <Separator className="w-full shrink" />
            </div>
            <div className="flex flex-col gap-5">
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
                        className="bg-transparent"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="password"
                        autoComplete="current-password"
                        required
                        className="bg-transparent"
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
              Sign in
            </Button>

            {error && <FormAlert variant="destructive" message={error} />}

            <div className="mt-2.5 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
