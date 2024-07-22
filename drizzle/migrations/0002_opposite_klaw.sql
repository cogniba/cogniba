ALTER TABLE "auth"."users" RENAME COLUMN "children" TO "parent";--> statement-breakpoint
ALTER TABLE "auth"."users" ALTER COLUMN "parent" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."users" ADD CONSTRAINT "users_parent_users_id_fk" FOREIGN KEY ("parent") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
