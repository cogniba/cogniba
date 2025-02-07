import { timestamp, text, pgTable, uuid, pgEnum } from "drizzle-orm/pg-core";
import { profilesTable } from "./profilesTable";
import stripeConfig from "@/config/stripeConfig";
import { InferSelectModel } from "drizzle-orm";
import getFreePlan from "@/lib/stripe/getFreePlan";

const planNames = stripeConfig.plans.map((plan) => plan.name) as [
  string,
  ...string[],
];

const { freePlan, error } = getFreePlan();
if (error || !freePlan) {
  throw new Error("No free plan found in stripe config");
}

export const SubscriptionTypeEnum = pgEnum("subscription_type", planNames);

export const customersTable = pgTable("customers", {
  userId: uuid("id")
    .primaryKey()
    .references(() => profilesTable.userId, { onDelete: "cascade" })
    .notNull(),

  customerId: text("customer_id").unique().notNull(),
  subscriptionType: SubscriptionTypeEnum("subscription_type")
    .default(freePlan.name)
    .notNull(),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type SubscriptionType = (typeof planNames)[number];
export type CustomerType = InferSelectModel<typeof customersTable>;
