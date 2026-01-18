import "server-only";

import Stripe from "stripe";
import getEnv from "@/lib/env";

const stripe = new Stripe(getEnv("STRIPE_SECRET_KEY"), {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

export default stripe;
