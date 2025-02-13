import { notFound } from "next/navigation";
import supabase from "@/lib/supabase";

export default async function DocDetails({
  params,
}: {
  params: { id: string };
}) {
  const { data: doc } = await supabase
    .from("docs")
    .select("body, user_id, created_at, updated_at")
    .eq("id", Number(params.id))
    .single();

  if (!doc) notFound();

  return (
    <div className="p-6">
      <p className="mb-4">{doc.body}</p>
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
  );
}
