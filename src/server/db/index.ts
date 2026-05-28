import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Database = ReturnType<typeof drizzle<typeof schema>>;

let db: Database | null = null;

export function getDb(): Database {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required to connect to PostgreSQL");
  }

  if (!db) {
    const client = postgres(connectionString, {
      prepare: false,
    });

    db = drizzle(client, { schema });
  }

  return db;
}
