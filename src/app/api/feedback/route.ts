import createClient from "@/lib/supabase/server";
import { FeedbackSchema } from "@/zod/schemas/FeedbackSchema";
import { NextResponse } from "next/server";
import { feedbackTable } from "@/database/schemas/feedbackTable";
import { db } from "@/database";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedData = FeedbackSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    }

    const { type, message } = parsedData.data;

    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return NextResponse.json(
        { error: "Failed to get user" },
        { status: 400 },
      );
    }

    const userId = data.user.id;

    await db.insert(feedbackTable).values({
      type,
      message,
      userId,
    });

    // Send email notification
    await resend.emails.send({
      from: "feedback@cogniba.com",
      to: process.env.NEXT_PUBLIC_FEEDBACK_EMAIL!,
      subject: `New Feedback: ${type}`,
      text: `New feedback received.\n\n\nType:\n${type}\n\nMessage:\n${message}\n\nUser ID:\n${userId}`,
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error processing feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
