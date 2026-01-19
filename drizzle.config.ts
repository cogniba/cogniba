import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";
import getEnv from "@/lib/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export default defineConfig({
  schemaFilter: ["public"],
  dialect: "postgresql",
  schema: "./src/database/schemas/*",
  out: "./supabase/migrations",
  dbCredentials: {
    url: getEnv("DATABASE_URL"),
  },
});
