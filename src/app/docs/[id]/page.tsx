import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import SingleLayout from "@/components/layouts/SingleLayout";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import DocDeleteButton from "../_components/DocDeleteButton";
import { findDoc } from "@/server/services/docs";

export default async function DocDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await findDoc(Number(id));

  if (!doc) notFound();

  return (
    <SingleLayout>
      <Card className="p-6 max-w-6xl mx-auto my-6 flex flex-col h-full">
        <CardHeader>
          <div className="text-5xl font-bold">{doc.title}</div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row">
            <p>
              <span className="font-semibold text-gray-700">公開:</span>{" "}
              {doc.createdAt ? new Date(doc.createdAt).toLocaleString() : "—"}
            </p>
            <p className="mr-5 ml-5">
              <span className="font-semibold text-gray-700"></span>{" "}
              {doc.authorLastName}
            </p>
            <p>
              <span className="font-semibold text-gray-700">更新:</span>{" "}
              {doc.updatedAt ? new Date(doc.updatedAt).toLocaleString() : "—"}
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
