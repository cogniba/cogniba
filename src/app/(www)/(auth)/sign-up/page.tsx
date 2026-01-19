"use client";

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
import type { SignUpSchemaType } from "@/zod/schemas/SignUpSchema";
import { SignUpSchema } from "@/zod/schemas/SignUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Separator } from "@/components/ui/separator";
import LoaderWrapper from "@/components/LoaderWrapper";
import signUp from "@/actions/auth/signUp";
import createClient from "@/lib/supabase/client";
import { usePostHog } from "posthog-js/react";
import getEnv from "@/lib/env";

export default function SignUpPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [isSigningInWithGoogle, setIsSigningInWithGoogle] = useState(false);
  const posthog = usePostHog();

  const disabled = isPending || isSigningInWithGoogle || hasSignedUp;

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(formData: SignUpSchemaType) {
    setError(null);
    posthog.capture("user_signup_initiated", { provider: "email" });

    startTransition(async () => {
      const { error } = await signUp(formData);
      if (error) {
        setError(error);
        posthog.capture("user_signup_error", { error, provider: "email" });
      } else {
        setHasSignedUp(true);
      }
    });
  }

  const handleSignInWithGoogle = () => {
    setError(null);
    setIsSigningInWithGoogle(true);

    startTransition(async () => {
      const supabase = createClient();

      posthog.capture("user_signup_initiated", { provider: "google" });

      const redirectUrl = new URL(
        `${getEnv("NEXT_PUBLIC_SITE_URL")}/api/auth/supabase/callback`,
      );
      redirectUrl.searchParams.set("next", "/app");
      redirectUrl.searchParams.set("type", "signup");
      redirectUrl.searchParams.set("provider", "google");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl.toString(),
        },
      });

      if (error) {
        setError("An error occurred while signing in with Google.");
        posthog.capture("user_signup_error", {
          error: error.message,
          provider: "google",
        });
      }
    });
  };

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
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>Create a new account</CardDescription>
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
                <FaGoogle className="" />
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
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="fullName">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={disabled}
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Marcos Hernanz"
                        autoComplete="name"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={disabled}
                        type="password"
                        autoComplete="new-password"
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
              <LoaderWrapper loading={isPending}>Sign Up</LoaderWrapper>
            </Button>

            {error && <FormAlert variant="destructive" message={error} />}
            {hasSignedUp && (
              <FormAlert
                variant="success"
                message="Please check your inbox to confirm your email."
              />
            )}

            <div className="mt-2.5 text-center text-sm">
              Already have an account?{" "}
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
