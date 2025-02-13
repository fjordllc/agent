import { notFound } from "next/navigation";
import supabase from "@/lib/supabase";

export default async function DocDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: doc, error } = await supabase
    .from("docs")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error) {
    alert(`ドキュメントの取得に失敗しました。\n${error.code} ${error.message}`);
    console.error(
      `ドキュメントの取得に失敗しました。\n${error.code} ${error.message}`,
    );
  }
  if (!doc) notFound();

  return (
    <div className="p-6">
      <p className="mb-4">{doc.body}</p>
      <p>
        <span className="font-semibold text-gray-700">User:</span> {doc.user_id}
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
  );
}
