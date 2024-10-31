ALTER TABLE "settings" RENAME COLUMN "id" TO "user_id";--> statement-breakpoint
ALTER TABLE "settings" DROP CONSTRAINT "settings_id_profiles_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "settings" ADD CONSTRAINT "settings_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
