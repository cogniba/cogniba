ALTER TABLE "profiles" RENAME COLUMN "name" TO "last_name";--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "first_name" text NOT NULL;