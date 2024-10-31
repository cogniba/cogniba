ALTER TABLE "profiles" RENAME COLUMN "first_name" TO "full_name";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "last_name";