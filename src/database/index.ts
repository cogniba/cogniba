import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

function singleton<Value>(name: string, value: () => Value): Value {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalAny: any = global;
  globalAny.__singletons = globalAny.__singletons || {};

  if (!globalAny.__singletons[name]) {
    globalAny.__singletons[name] = value();
  }

  return globalAny.__singletons[name];
}

function createDatabaseConnection() {
  const client = postgres(process.env.DATABASE_URL!, { prepare: false });
  return drizzle(client);
}

export const db = singleton("db", createDatabaseConnection);
