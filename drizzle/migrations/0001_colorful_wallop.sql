CREATE TABLE IF NOT EXISTS "games" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"level" integer NOT NULL,
	"newLevel" integer NOT NULL,
	"correctHits" integer NOT NULL,
	"incorrectHits" integer NOT NULL,
	"missedHits" integer NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "children" text[];--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
