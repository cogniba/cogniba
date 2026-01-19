"use server";

import { feedbackTable } from "@/database/schemas/feedbackTable";
import getUserOrError from "@/lib/auth/getUserOrError";
import { Resend } from "resend";
import { db } from "@/database";
import type { FeedbackSchemaType } from "@/zod/schemas/FeedbackSchema";
import getEnv from "@/lib/env";
import { err, ok, type Result } from "@/lib/result";

const resend = new Resend(getEnv("RESEND_API_KEY"));

export default async function sendFeedback(
  formData: FeedbackSchemaType,
): Promise<Result<{ success: true }>> {
  try {
    const userResult = await getUserOrError();
    if (userResult.error || !userResult.data) {
      return err("User not found");
    }

    const user = userResult.data;

    const { type, message } = formData;
    const userId = user.id;

    await db.insert(feedbackTable).values({
      type,
      message,
      userId,
    });

    await resend.emails.send({
      from: "feedback@cogniba.com",
      to: getEnv("NEXT_PUBLIC_FEEDBACK_EMAIL"),
      subject: `New Feedback: ${type}`,
      text: `New feedback received.\n\n\nType:\n${type}\n\nMessage:\n${message}\n\nUser ID:\n${userId}`,
    });

    return ok({ success: true });
  } catch (error) {
    console.error(error);
    return err("An unexpected error occurred");
  }
}
