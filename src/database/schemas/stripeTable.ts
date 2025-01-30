import {
  timestamp,
  text,
  pgTable,
  uuid,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import { profilesTable } from "./profilesTable";

const stripeStatusValues = [
  "active",
  "canceled",
  "incomplete",
  "incomplete_expired",
  "past_due",
  "paused",
  "trialing",
  "unpaid",
] as const;

export const SubscriptionStatusEnum = pgEnum(
  "subscription_status",
  stripeStatusValues,
);

export const stripeTable = pgTable("stripe", {
  userId: uuid("id")
    .primaryKey()
    .references(() => profilesTable.userId, { onDelete: "cascade" })
    .notNull(),
  customerId: text("customer_id").unique().notNull(),

  subscriptionId: text("subscription_id"),
  status: SubscriptionStatusEnum("status"),
  priceId: text("price_id"),

  currentPeriodStart: timestamp("current_period_start", { mode: "date" }),
  currentPeriodEnd: timestamp("current_period_end", { mode: "date" }),
  cancelAtPeriodEnd: boolean("cancel_at_period_end"),

  paymentMethodBrand: text("payment_method_brand"),
  paymentMethodLast4: text("payment_method_last4"),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});
