import { updateDoc } from "../../_actions/updateDoc";
import { createClient } from "@/lib/supabaseServer";
import SingleLayout from "@/components/layouts/SingleLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function EditDoc({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("docs")
    .select("title, body")
    .eq("id", Number(params.id))
    .single();

  if (!data) {
    return <p>Document not found.</p>;
  }

  return (
    <SingleLayout>
      <div className="flex justify-center items-center min-h-screen p-6 relative">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>ページ編集</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateDoc}>
              <input type="hidden" name="id" value={params.id} />
              <p className="mb-2">タイトル</p>
              <Input
                type="text"
                name="title"
                defaultValue={data.title}
                placeholder="Enter title"
                className="mb-4"
              />

              <p className="mb-2">本文</p>
              <Textarea
                rows={10}
                name="body"
                defaultValue={data.body}
                placeholder="Enter body"
                className="mb-4"
              />

              <div className="mb-4 flex justify-center items-center">
                <Button type="submit">内容を更新</Button>
                <Link href={`/docs/${params.id}`} className="ml-4">
                  <Button
                    variant="link"
                    className="text-gray-500 underline hover:text-red-500"
                  >
                    キャンセル
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </SingleLayout>
  );
}
