DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('parent', 'student');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users_table" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "type" "type";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "children" text[];