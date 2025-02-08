import Link from "next/link";
import useDocs from "@/hooks/useDocs";
import Pagination from "./Pagination";

interface DocsProps {
  itemsPerPage: number;
}

export default function DocList({ itemsPerPage }: DocsProps) {
  const { docs, currentPage, totalPages, loading, setCurrentPage } = useDocs({
    itemsPerPage,
  });

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {docs.map((doc) => (
            <li key={doc.id}>
              <Link
                href={{
                  pathname: `/docs/${doc.id}`,
                  query: {
                    title: doc.title,
                    body: doc.body,
                    created_at: doc.created_at,
                    updated_at: doc.updated_at,
                    user_id: doc.user_id,
                    last_updated_user_id: doc.last_updated_user_id,
                  },
                }}
              >
                {doc.title}
              </Link>
              <p>{doc.body}</p>
            </li>
          ))}
        </ul>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
