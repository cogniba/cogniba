"use client";

import * as z from "zod";

import SettingsItem from "../SettingsItem";
import FormAlert from "@/components/FormAlert";
import handleChangePassword from "@/server-actions/handleChangePassword";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ChangePasswordSchema } from "@/zod/schemas/ChangePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChangePasswordSettings() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof ChangePasswordSchema>) {
    setError(null);
    setSuccess(null);

    startTransition(() => {
      handleChangePassword(data).then((result) => {
        if (result) {
          setError(result.error ?? null);
          setSuccess(result.success ?? null);
        }
      });
    });
  }

  return (
    <>
      <SettingsItem
        title="Change password"
        description="Change your password"
        type="button"
        buttonText="Change password"
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-full w-full max-w-none items-center justify-center sm:h-fit sm:max-w-lg">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-lg space-y-6"
            >
              <DialogHeader>
                <DialogTitle className="text-2xl">Change password</DialogTitle>
                <DialogDescription>
                  Enter a new password to replace your old one
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="oldPassword">Old password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          id="oldPassword"
                          name="oldPassword"
                          type="password"
                          autoComplete="current-password"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="newPassword">New password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          id="newPassword"
                          name="newPassword"
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
                      <FormLabel htmlFor="confirmPassword">
                        Confirm new password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          autoComplete="off"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-6">
                <Button type="submit" disabled={isPending}>
                  Change password
                </Button>
                {error && <FormAlert variant="destructive" message={error} />}
                {success && <FormAlert variant="success" message={success} />}
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
