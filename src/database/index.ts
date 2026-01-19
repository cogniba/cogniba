import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import getEnv from "@/lib/env";

function singleton<Value>(name: string, value: () => Value): Value {
  const globalAny = global as typeof global & {
    __singletons?: Record<string, unknown>;
  };
  globalAny.__singletons ??= {};
  const store = globalAny.__singletons;

  store[name] ??= value();

  return store[name] as Value;
}

function createDatabaseConnection() {
  const client = postgres(getEnv("DATABASE_URL"), { prepare: false });
  return drizzle(client);
}

export const db = singleton("db", createDatabaseConnection);
