import { notFound } from "next/navigation";
import supabase from "@/lib/supabase";
import { createClient } from "@/utils/supabase/server";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import SingleLayout from "@/components/layouts/SingleLayout";
import DocDeleteButton from "@/app/docs/_components/DocDeleteButton";
import ClientErrorToaster from "@/components/toast/ClientErrorToaster";
import Link from "next/link";

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
    .single();

  if (docError) {
    console.error(
      `ドキュメントの取得に失敗しました。\n${docError.code} ${docError.message}`,
    );
  }

  if (userError) {
    console.error(
      `ドキュメントを作成したユーザーの取得に失敗しました。\n${userError.code} ${userError.message}`,
    );
  }

  if (!doc) notFound();

  return (
    <SingleLayout>
      {(docError || userError) && (
        <ClientErrorToaster
          errors={[docError, userError]}
          title={
            userError
              ? "ドキュメントを作成したユーザーの取得に失敗しました。"
              : "ドキュメントの取得に失敗しました。"
          }
        />
      )}

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

        <div className="mt-6 flex justify-between items-center">
          <div className="flex-1 flex justify-center">
            <Link
              href={`/docs/edit?id=${id}`}
              className="border border-black bg-white text-gray-800 px-6 py-1 rounded-md transition-colors hover:bg-gray-100 hover:text-black"
            >
              内容変更
            </Link>
          </div>
          <DocDeleteButton id={id} />
        </div>
      </Card>
    </SingleLayout>
  );
}
