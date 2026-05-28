import {
  bigint,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  website: text("website"),
  memo: text("memo"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const docs = pgTable("docs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  userId: text("user_id").notNull(),
  lastUpdatedUserId: text("last_updated_user_id").notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  role: text("role").default("job_seeker"),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  firstNameKana: text("first_name_kana"),
  lastNameKana: text("last_name_kana"),
});

export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;
export type Doc = typeof docs.$inferSelect;
export type NewDoc = typeof docs.$inferInsert;
