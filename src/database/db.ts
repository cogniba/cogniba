import "@/../envConfig";
import { drizzle } from "drizzle-orm/neon-http";
import * as users from "./schemas/users";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema: { ...users } });
