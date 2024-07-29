ALTER TABLE "auth"."users" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."users" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."users" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."users" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."users" DROP COLUMN IF EXISTS "image";