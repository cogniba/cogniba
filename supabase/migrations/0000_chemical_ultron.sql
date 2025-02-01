/*
CREATE TYPE "public"."status" AS ENUM ('active', 'inactive');

CREATE TABLE
"subscriptions" (
"user_id" uuid NOT NULL,
"subscription_id" text NOT NULL,
"status" "status" DEFAULT 'inactive' NOT NULL,
"last_payment_date" date,
"id" uuid PRIMARY KEY NOT NULL
);

ALTER TABLE "subscriptions" ENABLE ROW LEVEL SECURITY;

CREATE TABLE
"feedback" (
"id" uuid PRIMARY KEY NOT NULL,
"user_id" uuid NOT NULL,
"message" text NOT NULL,
"created_at" timestamp DEFAULT now () NOT NULL
);

ALTER TABLE "feedback" ENABLE ROW LEVEL SECURITY;

CREATE TABLE
"games" (
"id" uuid PRIMARY KEY NOT NULL,
"user_id" uuid NOT NULL,
"level" integer NOT NULL,
"new_level" integer NOT NULL,
"correct_hits" integer NOT NULL,
"incorrect_hits" integer NOT NULL,
"missed_hits" integer NOT NULL,
"time_played" integer NOT NULL,
"created_at" timestamp DEFAULT now () NOT NULL
);

ALTER TABLE "games" ENABLE ROW LEVEL SECURITY;

CREATE TABLE
"profiles" (
"user_id" uuid PRIMARY KEY NOT NULL,
"email" text NOT NULL,
"has_finished_tutorial" boolean DEFAULT false NOT NULL,
"created_at" timestamp DEFAULT now () NOT NULL,
"full_name" text NOT NULL,
CONSTRAINT "profiles_email_unique" UNIQUE ("email")
);

ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;

CREATE TABLE
"settings" (
"user_id" uuid PRIMARY KEY NOT NULL,
"show_feedback" boolean DEFAULT true NOT NULL
);

ALTER TABLE "settings" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_profiles_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles" ("user_id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "feedback" ADD CONSTRAINT "feedback_user_id_profiles_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles" ("user_id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "games" ADD CONSTRAINT "games_user_id_profiles_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles" ("user_id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users" ("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "settings" ADD CONSTRAINT "settings_user_id_profiles_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles" ("user_id") ON DELETE cascade ON UPDATE no action;

CREATE POLICY "Enable insert for users based on user_id" ON "subscriptions" AS PERMISSIVE FOR INSERT TO public
WITH
CHECK (
(
(
SELECT
auth.uid () AS uid
) = user_id
)
);

CREATE POLICY "Enable update for users based on user_id" ON "subscriptions" AS PERMISSIVE FOR
UPDATE TO public;

CREATE POLICY "Enable users to view their own data only" ON "subscriptions" AS PERMISSIVE FOR
SELECT
TO "authenticated";

CREATE POLICY "Enable insert for users based on user_id" ON "feedback" AS PERMISSIVE FOR INSERT TO public
WITH
CHECK (
(
(
SELECT
auth.uid () AS uid
) = user_id
)
);

CREATE POLICY "Enable insert for users based on user_id" ON "games" AS PERMISSIVE FOR INSERT TO public
WITH
CHECK (
(
(
SELECT
auth.uid () AS uid
) = user_id
)
);

CREATE POLICY "Enable users to view their own data only" ON "games" AS PERMISSIVE FOR
SELECT
TO "authenticated";

CREATE POLICY "Enable insert for users based on user_id" ON "profiles" AS PERMISSIVE FOR INSERT TO public
WITH
CHECK (
(
(
SELECT
auth.uid () AS uid
) = user_id
)
);

CREATE POLICY "Enable update for users based on email" ON "profiles" AS PERMISSIVE FOR
UPDATE TO public;

CREATE POLICY "Enable users to view their own data only" ON "profiles" AS PERMISSIVE FOR
SELECT
TO "authenticated";

CREATE POLICY "Enable insert for users based on user_id" ON "settings" AS PERMISSIVE FOR INSERT TO public
WITH
CHECK (
(
(
SELECT
auth.uid () AS uid
) = user_id
)
);

CREATE POLICY "Enable update for users based on user_id" ON "settings" AS PERMISSIVE FOR
UPDATE TO public;

CREATE POLICY "Enable users to view their own data only" ON "settings" AS PERMISSIVE FOR
SELECT
TO "authenticated";

 */