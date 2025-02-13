import { useDocs } from "@/hooks/useDocs";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "./Pagination";

interface DocsProps {
  itemsPerPage: number;
}

export default function DocList({ itemsPerPage }: DocsProps) {
  const { currentPage, setCurrentPage } = usePagination({ initialPage: 1 });
  const { docs, totalPages, loading } = useDocs({ itemsPerPage, currentPage });

  return (
    <div>
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
