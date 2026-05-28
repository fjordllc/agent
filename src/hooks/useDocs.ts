import { useState, useEffect } from "react";
import { listDocsAction } from "@/app/docs/_actions/listDocs";

export type Doc = {
  id: number;
  title: string;
  body: string;
  createdAt: string | null;
  updatedAt: string | null;
  userId: string;
  lastUpdatedUserId: string;
};

interface UseDocsProps {
  itemsPerPage: number;
  currentPage: number;
}

export function useDocs({ itemsPerPage = 20, currentPage = 1 }: UseDocsProps) {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const result = await listDocsAction({ currentPage, itemsPerPage });

      if (cancelled) return;

      if ("error" in result) {
        console.error("Error fetching docs:", result.error);
        setLoading(false);
        return;
      }

      setDocs(result.docs);
      setTotalPages(result.totalPages);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [currentPage, itemsPerPage]);

  return { docs, totalPages, loading };
}
