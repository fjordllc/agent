"use server";

import { listDocs } from "@/server/services/docs";

export async function listDocsAction({
  currentPage,
  itemsPerPage,
}: {
  currentPage: number;
  itemsPerPage: number;
}) {
  try {
    const result = await listDocs({ currentPage, itemsPerPage });

    return {
      docs: result.docs.map((doc) => ({
        ...doc,
        createdAt: doc.createdAt?.toISOString() ?? null,
        updatedAt: doc.updatedAt?.toISOString() ?? null,
      })),
      totalPages: result.totalPages,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "ドキュメント一覧の取得に失敗しました。",
    };
  }
}
