import { notFound } from "next/navigation";
import supabase from "@/lib/supabase";
import { createClient } from "@/lib/supabaseServer";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import SingleLayout from "@/components/layouts/SingleLayout";
import DocDeleteButton from "@/components/DocDeleteButton";

export default async function DocDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: doc, error: docError } = await supabase
    .from("docs")
    .select("title,body, user_id, created_at, updated_at")
    .eq("id", Number(id))
    .single();

  const { data: user, error: userError } = await (
    await createClient()
  )
    .from("users")
    .select("last_name")
    .eq("id", doc?.user_id ?? "")
    .maybeSingle();

  if (docError) {
    console.error(
      `ドキュメントの取得に失敗しました。\n${docError.code} ${docError.message}`,
    );
  }

  if (userError) {
    console.error(
      `ユーザーの名前の取得に失敗しました。\n${userError.code} ${userError.message}`,
    );
  }
  if (!doc) notFound();

  return (
    <SingleLayout>
      <Card className="p-6 max-w-2xl mx-auto my-6 flex flex-col h-full">
        <CardHeader>
          <div className="text-2xl font-bold">{doc.title}</div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="mb-4 text-lg">{doc.body}</p>
          <div className="space-y-2">
            <p>
              <span className="font-semibold text-gray-700">User:</span>{" "}
              {user?.last_name}
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
        <div className="flex justify-end mt-4">
          <DocDeleteButton id={id} />
        </div>
      </Card>
    </SingleLayout>
  );
}
