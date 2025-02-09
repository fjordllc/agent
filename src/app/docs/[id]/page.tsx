import { notFound } from "next/navigation";
import supabase from "@/lib/supabase";

export default async function DocDetails({
  params,
}: {
  params: { id: string };
}) {
  const { data: doc } = await supabase
    .from("docs")
    .select(
      "title, body, user_id, last_updated_user_id, created_at, updated_at",
    )
    .eq("id", Number(params.id))
    .single();

  if (!doc) notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{doc.title}</h1>
      <p className="mb-4">{doc.body}</p>
      <p>
        <span className="font-semibold text-gray-700">User ID:</span>{" "}
        {doc.user_id}
      </p>
      <p>
        <span className="font-semibold text-gray-700">Last Updated By:</span>{" "}
        {doc.last_updated_user_id}
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
