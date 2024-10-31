ALTER TABLE "users_table" RENAME TO "profiles";--> statement-breakpoint
ALTER TABLE "games_table" RENAME TO "games";--> statement-breakpoint
ALTER TABLE "settings_table" RENAME TO "settings";--> statement-breakpoint
ALTER TABLE "profiles" DROP CONSTRAINT "users_table_email_unique";--> statement-breakpoint
ALTER TABLE "profiles" DROP CONSTRAINT "users_table_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "games" DROP CONSTRAINT "games_table_user_id_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "settings" DROP CONSTRAINT "settings_table_user_id_users_table_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "settings" ADD CONSTRAINT "settings_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_email_unique" UNIQUE("email");