CREATE TABLE IF NOT EXISTS "settings" (
	"id" text PRIMARY KEY NOT NULL,
	"showFeedback" boolean NOT NULL,
	"canChildrenChangeSettings" boolean
);
--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "settingsId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."users" ADD CONSTRAINT "users_settingsId_settings_id_fk" FOREIGN KEY ("settingsId") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
