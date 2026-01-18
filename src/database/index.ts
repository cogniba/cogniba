import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

function singleton<Value>(name: string, value: () => Value): Value {
  const globalAny = global as typeof global & {
    __singletons?: Record<string, unknown>;
  };
  globalAny.__singletons = globalAny.__singletons || {};

  if (!globalAny.__singletons[name]) {
    globalAny.__singletons[name] = value();
  }

  return globalAny.__singletons[name] as Value;
}

function createDatabaseConnection() {
  const client = postgres(process.env.DATABASE_URL!, { prepare: false });
  return drizzle(client);
}

export const db = singleton("db", createDatabaseConnection);
