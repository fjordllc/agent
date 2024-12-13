import { useState, useEffect } from "react";
import supabase from "..//lib/supabase";

interface Doc {
  body: string;
  created_at: string | null;
  id: number;
  last_updated_user_id: number;
  title: string;
  updated_at: string | null;
  user_id: number;
}

const itemsPerPage = 1;

export default function Docs() {
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
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Docs</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {docs.map((doc) => (
            <li key={doc.id}>
              <h3>{doc.title}</h3>
              <p>{doc.body}</p>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
