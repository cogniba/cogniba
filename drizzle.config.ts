import { defineConfig } from "drizzle-kit";

console.log(process.env.NEXT_PUBLIC_TEST);

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schemas/*",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_TEST!,
  }
});
