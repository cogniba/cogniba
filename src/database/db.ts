import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

function singleton<Value>(name: string, value: () => Value): Value {
  const globalAny: any = global;
  globalAny.__singletons = globalAny.__singletons || {};

  if (!globalAny.__singletons[name]) {
    globalAny.__singletons[name] = value();
  }

  return globalAny.__singletons[name];
}

function createDatabaseConnection() {
  const connection = postgres(process.env.DATABASE_URL!, {
    prepare: false,
  });
  return drizzle(connection);
}

export const db = singleton("db", createDatabaseConnection);
