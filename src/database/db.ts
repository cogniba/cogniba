import * as authSchema from "@/database/schemas/auth";
import * as gamesSchema from "@/database/schemas/games";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema: { ...authSchema, ...gamesSchema } });
