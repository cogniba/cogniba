"use client";

import Link from "next/link";
import FormAlert from "@/components/FormAlert";
import { usePostHog } from "posthog-js/react";

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
import { SignInSchema, SignInSchemaType } from "@/zod/schemas/SignInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Separator } from "@/components/ui/separator";
import LoaderWrapper from "@/components/LoaderWrapper";
import signIn from "@/actions/auth/signIn";
import createClient from "@/lib/supabase/client";

export default function SignInPage() {
  const posthog = usePostHog();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isSigningInWithGoogle, setIsSigningInWithGoogle] = useState(false);

  const disabled = isPending || isSigningInWithGoogle;

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(formData: SignInSchemaType) {
    setError(null);
    posthog.capture("signin_initiated", { provider: "email" });

    startTransition(async () => {
      const { error } = await signIn(formData);
      if (error) {
        setError(error);
        posthog.capture("signin_error", { error, provider: "email" });
      }
    });
  }

  const handleSignInWithGoogle = async () => {
    setError(null);
    setIsSigningInWithGoogle(true);

    startTransition(async () => {
      const supabase = createClient();

      posthog.capture("signin_initiated", { provider: "google" });

      const redirectUrl = new URL(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/supabase/callback`,
      );
      redirectUrl.searchParams.set("next", "/app");
      redirectUrl.searchParams.set("provider", "google");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl.toString(),
        },
      });

      if (error) {
        setError("An error occurred while signing in with Google.");
        posthog.capture("signin_error", {
          error: error.message,
          provider: "google",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex h-full w-full items-center justify-center bg-card py-5 xs:bg-background"
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
              disabled={disabled}
              type="button"
              variant="secondary"
              className="font-semibold"
            >
              <LoaderWrapper loading={isSigningInWithGoogle}>
                <FaGoogle />
                Continue with Google
              </LoaderWrapper>
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="forgot-password"
                        className="text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={disabled}
                        type="password"
                        autoComplete="current-password"
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
            <Button type="submit" className="w-full" disabled={disabled}>
              <LoaderWrapper loading={isPending}>Sign In</LoaderWrapper>
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
