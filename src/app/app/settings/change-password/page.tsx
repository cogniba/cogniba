"use client";

import changePassword from "@/actions/auth/changePassword";
import FormAlert from "@/components/FormAlert";
import LoaderWrapper from "@/components/LoaderWrapper";
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
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ChangePasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [hasChangedPassword, setHasChangedPassword] = useState(false);

  const disabled = isPending || hasChangedPassword;

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
      const { error } = await changePassword(formData);

      if (!error) {
        setHasChangedPassword(true);
      } else {
        setError(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-1 items-center justify-center bg-card py-5 xs:bg-background"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="w-full max-w-sm border-transparent px-2 shadow-none xs:border-border xs:shadow-sm">
          <CardHeader className="pb-9">
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
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
          </CardContent>

          <CardFooter className="flex flex-col gap-6">
            <Button type="submit" className="w-full" disabled={disabled}>
              <LoaderWrapper loading={isPending}>Change password</LoaderWrapper>
            </Button>

            {error && <FormAlert variant="destructive" message={error} />}
            {hasChangedPassword && (
              <FormAlert
                variant="success"
                message="Your password has been changed successfully."
              />
            )}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
