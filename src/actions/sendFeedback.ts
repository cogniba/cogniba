"use server";

import createClient from "@/lib/supabase/server";
import { feedbackTable } from "@/database/schemas/feedbackTable";
import { Resend } from "resend";
import { db } from "@/database";
import { FeedbackSchemaType } from "@/zod/schemas/FeedbackSchema";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendFeedback(
  formData: FeedbackSchemaType,
): Promise<{ error?: string }> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      const error = new Error("User not found");
      console.error(error);
      return { error: error.message };
    }

    const { type, message } = formData;
    const userId = user.id;

    await db.insert(feedbackTable).values({
      type,
      message,
      userId,
    });

    await resend.emails.send({
      from: process.env.FEEDBACK_EMAIL!,
      to: process.env.FEEDBACK_EMAIL!,
      subject: `New Feedback: ${type}`,
      text: `New feedback received.\n\n\nType:\n${type}\n\nMessage:\n${message}\n\nUser ID:\n${userId}`,
    });

    return {};
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred" };
  }
}
