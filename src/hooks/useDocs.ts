import { useState, useEffect, useCallback } from "react";
import supabase from "@/lib/supabase";
import { Tables } from "@/lib/database.types";

type Doc = Tables<"docs">;

interface UseDocsProps {
  itemsPerPage: number;
  currentPage: number;
}

export function useDocs({ itemsPerPage = 20, currentPage = 1 }: UseDocsProps) {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDocs = useCallback(async () => {
    setLoading(true);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage - 1;

    const { data, count, error } = await supabase
      .from("docs")
      .select("*", { count: "exact" })
      .range(start, end);

    if (error) {
      console.error("Error fetching docs:", error.message);
      setLoading(false);
      return;
    }

    setDocs(data || []);
    setTotalPages(Math.ceil((count || 0) / itemsPerPage));
    setLoading(false);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  return { docs, totalPages, loading };
}
