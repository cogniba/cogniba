import { Column, sql } from "drizzle-orm";

export function date(column: Column) {
  return sql<Date>`DATE(${column})`;
}
