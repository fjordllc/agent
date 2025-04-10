import { notFound } from "next/navigation";
import Link from "next/link";
import supabase from "@/lib/supabase";
import { createClient } from "@/utils/supabase/server";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import SingleLayout from "@/components/layouts/SingleLayout";
import ClientErrorToaster from "@/components/toast/ClientErrorToaster";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import DocDeleteButton from "../_components/DocDeleteButton";

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

  console.log(`user: ${user}`);

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

      <Card className="p-6 max-w-6xl mx-auto my-6 flex flex-col h-full">
        <CardHeader>
          <div className="text-5xl font-bold">{doc.title}</div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row">
            <p>
              <span className="font-semibold text-gray-700">公開:</span>{" "}
              {new Date(doc.created_at).toLocaleString()}
            </p>
            <p className="mr-5 ml-5">
              <span className="font-semibold text-gray-700"></span>{" "}
              {user?.last_name}
            </p>
            <p>
              <span className="font-semibold text-gray-700">更新:</span>{" "}
              {new Date(doc.updated_at).toLocaleString()}
            </p>
          </div>

          <div className="prose lg:prose-xl mt-6">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, className, children, ...props }) {
                  /* 正規表現を使って className から言語名を抽出する */
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...props}>{children}</code>
                  );
                },
              }}
            >
              {doc.body}
            </Markdown>
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
