import { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import { Tables } from "../../supabase/database.types";

type Doc = Tables<"docs">;

interface UseDocsProps {
  itemsPerPage: number;
}

export default function useDocs({ itemsPerPage }: UseDocsProps) {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDocs = async (page: number) => {
    setLoading(true);

    const start = (page - 1) * itemsPerPage;
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
  };

  useEffect(() => {
    fetchDocs(currentPage);
  }, [currentPage, itemsPerPage]);

  return { docs, currentPage, totalPages, loading, setCurrentPage };
}