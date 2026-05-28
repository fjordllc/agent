import { count, desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/server/db";
import { docs, users, type Doc, type NewDoc } from "@/server/db/schema";

export type DocListItem = Pick<
  Doc,
  "id" | "title" | "body" | "createdAt" | "updatedAt" | "userId" | "lastUpdatedUserId"
>;

export async function listDocs({
  currentPage,
  itemsPerPage,
}: {
  currentPage: number;
  itemsPerPage: number;
}): Promise<{ docs: DocListItem[]; totalPages: number }> {
  const offset = (currentPage - 1) * itemsPerPage;
  const db = getDb();

  const [rows, totalRows] = await Promise.all([
    db
      .select()
      .from(docs)
      .orderBy(desc(docs.updatedAt))
      .limit(itemsPerPage)
      .offset(offset),
    db.select({ value: count() }).from(docs),
  ]);

  return {
    docs: rows,
    totalPages: Math.ceil((totalRows[0]?.value ?? 0) / itemsPerPage),
  };
}

export async function findDoc(id: number) {
  const rows = await getDb()
    .select({
      id: docs.id,
      title: docs.title,
      body: docs.body,
      userId: docs.userId,
      createdAt: docs.createdAt,
      updatedAt: docs.updatedAt,
      authorLastName: users.lastName,
    })
    .from(docs)
    .leftJoin(users, eq(sql`${users.id}::text`, docs.userId))
    .where(eq(docs.id, id))
    .limit(1);

  return rows[0] ?? null;
}

export async function findDocForEdit(id: number) {
  const rows = await getDb()
    .select({
      title: docs.title,
      body: docs.body,
    })
    .from(docs)
    .where(eq(docs.id, id))
    .limit(1);

  return rows[0] ?? null;
}

export async function createDoc(input: NewDoc): Promise<void> {
  await getDb().insert(docs).values(input);
}

export async function updateDoc({
  id,
  title,
  body,
}: {
  id: number;
  title: string;
  body: string;
}): Promise<void> {
  await getDb()
    .update(docs)
    .set({ title, body, updatedAt: new Date() })
    .where(eq(docs.id, id));
}

export async function deleteDoc(id: number): Promise<void> {
  await getDb().delete(docs).where(eq(docs.id, id));
}
