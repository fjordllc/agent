import { notFound } from "next/navigation";
import supabase from "@/lib/supabase";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default async function DocDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: doc, error } = await supabase
    .from("docs")
    .select("title,body, user_id, created_at, updated_at")
    .eq("id", Number(id))
    .single();

  if (error) {
    console.error(
      `ドキュメントの取得に失敗しました。\n${error.code} ${error.message}`,
    );
  }
  if (!doc) notFound();

  return (
    <Card className="p-6 max-w-2xl mx-auto my-6">
      <CardHeader>
        <div className="text-2xl font-bold">{doc.title}</div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-lg">{doc.body}</p>
        <div className="space-y-2">
          <p>
            <span className="font-semibold text-gray-700">User:</span>{" "}
            {doc.user_id}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Created At:</span>{" "}
            {new Date(doc.created_at).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Updated At:</span>{" "}
            {new Date(doc.updated_at).toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
