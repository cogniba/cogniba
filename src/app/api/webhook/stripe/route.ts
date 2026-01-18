import stripe from "@/lib/stripe/stripe";
import { stripeHandledEvents } from "@/lib/stripe/stripeHandledEvents";
import syncStripeData from "@/lib/stripe/syncStripeData";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import getEnv from "@/lib/env";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature") ?? "";

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      getEnv("STRIPE_WEBHOOK_SECRET"),
    );

    if (!stripeHandledEvents.includes(event.type)) {
      return NextResponse.json(
        { error: "Event type not handled" },
        { status: 200 },
      );
    }

    const { customer: customerId } = event?.data?.object as {
      customer: string;
    };

    if (typeof customerId !== "string") {
      return NextResponse.json(
        { error: "Invalid customer ID" },
        { status: 400 },
      );
    }

    const { error } = await syncStripeData(customerId);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
  } catch {
    return NextResponse.json(
      { error: "Error verifying stripe event" },
      { status: 400 },
    );
  }

  return NextResponse.json({ message: "Event handled" }, { status: 200 });
}
