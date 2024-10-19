import "dotenv/config";
import * as authSchema from "@/database/schemas/auth";
import * as gamesSchema from "@/database/schemas/games";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL!;

export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, {
  schema: { ...authSchema, ...gamesSchema },
});
