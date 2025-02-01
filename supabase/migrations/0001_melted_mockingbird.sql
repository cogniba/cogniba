CREATE TYPE "public"."subscription_type" AS ENUM ('Free', 'Pro');

--> statement-breakpoint
CREATE TYPE "public"."feedback_type" AS ENUM ('bug', 'feature', 'other');

--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM (
	'active',
	'canceled',
	'incomplete',
	'incomplete_expired',
	'past_due',
	'paused',
	'trialing',
	'unpaid'
);

--> statement-breakpoint
CREATE TABLE
	"customers" (
		"id" uuid PRIMARY KEY NOT NULL,
		"customer_id" text NOT NULL,
		"subscription_type" "subscription_type" DEFAULT 'Free' NOT NULL,
		"created_at" timestamp DEFAULT now () NOT NULL,
		CONSTRAINT "customers_customer_id_unique" UNIQUE ("customer_id")
	);

--> statement-breakpoint
CREATE TABLE
	"stripe" (
		"id" uuid PRIMARY KEY NOT NULL,
		"customer_id" text NOT NULL,
		"subscription_id" text,
		"status" "subscription_status",
		"price_id" text,
		"current_period_start" timestamp,
		"current_period_end" timestamp,
		"cancel_at_period_end" boolean,
		"payment_method_brand" text,
		"payment_method_last4" text,
		"created_at" timestamp DEFAULT now () NOT NULL,
		CONSTRAINT "stripe_customer_id_unique" UNIQUE ("customer_id")
	);

--> statement-breakpoint
ALTER TABLE "feedback" DISABLE ROW LEVEL SECURITY;

--> statement-breakpoint
ALTER TABLE "games" DISABLE ROW LEVEL SECURITY;

--> statement-breakpoint
ALTER TABLE "profiles" DISABLE ROW LEVEL SECURITY;

--> statement-breakpoint
ALTER TABLE "settings" DISABLE ROW LEVEL SECURITY;

--> statement-breakpoint
DROP POLICY "Enable insert for users based on user_id" ON "subscriptions" CASCADE;

--> statement-breakpoint
DROP POLICY "Enable update for users based on user_id" ON "subscriptions" CASCADE;

--> statement-breakpoint
DROP POLICY "Enable users to view their own data only" ON "subscriptions" CASCADE;

--> statement-breakpoint
DROP TABLE "subscriptions" CASCADE;

--> statement-breakpoint
ALTER TABLE "feedback"
ADD COLUMN "type" "feedback_type" NOT NULL;

--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_id_profiles_user_id_fk" FOREIGN KEY ("id") REFERENCES "public"."profiles" ("user_id") ON DELETE cascade ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "stripe" ADD CONSTRAINT "stripe_id_profiles_user_id_fk" FOREIGN KEY ("id") REFERENCES "public"."profiles" ("user_id") ON DELETE cascade ON UPDATE no action;

--> statement-breakpoint
DROP POLICY "Enable insert for users based on user_id" ON "feedback" CASCADE;

--> statement-breakpoint
DROP POLICY "Enable insert for users based on user_id" ON "games" CASCADE;

--> statement-breakpoint
DROP POLICY "Enable users to view their own data only" ON "games" CASCADE;

--> statement-breakpoint
DROP POLICY "Enable insert for users based on user_id" ON "profiles" CASCADE;

--> statement-breakpoint
DROP POLICY "Enable update for users based on email" ON "profiles" CASCADE;

--> statement-breakpoint
DROP POLICY "Enable users to view their own data only" ON "profiles" CASCADE;

--> statement-breakpoint
DROP POLICY "Enable insert for users based on user_id" ON "settings" CASCADE;

--> statement-breakpoint
DROP POLICY "Enable update for users based on user_id" ON "settings" CASCADE;

--> statement-breakpoint
DROP POLICY "Enable users to view their own data only" ON "settings" CASCADE;

--> statement-breakpoint
DROP TYPE "public"."status";