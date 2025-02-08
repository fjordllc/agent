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
    <div>
      <h1>{doc.title}</h1>
      <p>{doc.body}</p>
      <p>
        <strong>User ID:</strong> {doc.user_id}
      </p>
      <p>
        <strong>Last Updated By:</strong> {doc.last_updated_user_id}
      </p>
      <p>
        <strong>Created At:</strong> {new Date(doc.created_at).toLocaleString()}
      </p>
      <p>
        <strong>Updated At:</strong> {new Date(doc.updated_at).toLocaleString()}
      </p>
    </div>
  );
}
