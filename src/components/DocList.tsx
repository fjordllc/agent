import { useDocs } from "@/hooks/useDocs";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "./Pagination";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface DocsProps {
  itemsPerPage: number;
}

export default function DocList({ itemsPerPage }: DocsProps) {
  const { currentPage, setCurrentPage } = usePagination({ initialPage: 1 });
  const { docs, totalPages, loading } = useDocs({ itemsPerPage, currentPage });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-xl">
          {docs.map((doc) => (
            <Card
              key={doc.id}
              className="w-full hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle>{doc.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>公開: {doc.created_at}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
