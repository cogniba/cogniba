"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useTransition } from "react";
import LoaderWrapper from "@/components/LoaderWrapper";
import FormAlert from "@/components/FormAlert";
import { FeedbackSchema } from "@/zod/schemas/FeedbackSchema";
import type { z } from "zod";
import sendFeedback from "@/actions/sendFeedback";
import getEnv from "@/lib/env";

export default function FeedbackPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof FeedbackSchema>>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof FeedbackSchema>) {
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      const { error } = await sendFeedback(data);
      if (error) {
        setError(error);
      } else {
        setSuccess(true);
        form.reset();
      }
    });
  }

  return (
    <div className="bg-card xs:bg-background mb-10 flex flex-1 items-center justify-center py-5">
      <Card className="xs:mx-6 xs:border-border xs:shadow-sm w-full max-w-lg border-transparent px-2 shadow-none">
        <CardHeader>
          <CardTitle>Send Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={(event) => {
                void form.handleSubmit(onSubmit)(event);
              }}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feedback Type</FormLabel>
                    <Select
                      disabled={isPending || success}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select feedback type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bug">Bug</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isPending || success}
                        placeholder="Write your feedback here..."
                        rows={10}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <Button
                  disabled={isPending || success}
                  type="submit"
                  className="w-full"
                >
                  <LoaderWrapper loading={isPending}>
                    Submit Feedback
                  </LoaderWrapper>
                </Button>

                {error && <FormAlert variant="destructive" message={error} />}
                {success && (
                  <FormAlert
                    variant="success"
                    message="Thank you for your feedback!"
                  />
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground absolute bottom-2 px-4 text-center text-sm">
        Need a quick response? Email me at{" "}
        <a
          href={`mailto:${getEnv("NEXT_PUBLIC_FEEDBACK_EMAIL")}`}
          className="underline-offset-4 hover:underline"
        >
          {getEnv("NEXT_PUBLIC_FEEDBACK_EMAIL")}
        </a>
      </div>
    </div>
  );
}
