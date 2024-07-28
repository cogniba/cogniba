ALTER TABLE "auth"."users" RENAME COLUMN "parent" TO "parentId";--> statement-breakpoint
ALTER TABLE "auth"."users" DROP CONSTRAINT "users_parent_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."users" ADD CONSTRAINT "users_parentId_users_id_fk" FOREIGN KEY ("parentId") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
