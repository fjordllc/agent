"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import supabase from "@/lib/supabase";

export default function EditDoc({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [, setDoc] = useState<{ title: string; body: string } | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    async function fetchDoc() {
      const resolvedParams = await params;
      const { data } = await supabase
        .from("docs")
        .select("title, body")
        .eq("id", Number(resolvedParams.id))
        .single();

      if (data) {
        setDoc(data);
        setTitle(data.title);
        setBody(data.body);
      }
    }

    fetchDoc();
  }, [params]);

  const handleSave = async () => {
    const resolvedParams = await params;
    await supabase
      .from("docs")
      .update({ title, body })
      .eq("id", Number(resolvedParams.id));

    router.push(`/docs/${resolvedParams.id}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 relative">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>ページ編集</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">タイトル</p>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="mb-4"
          />

          <p className="mb-2">本文</p>
          <Textarea
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter body"
            className="mb-4"
          />
        </CardContent>
        <div className="mb-4 flex justify-center items-center">
        <Button onClick={handleSave}>内容を更新</Button>
          <Button
            variant="link"
            onClick={async () => router.push(`/docs/${(await params).id}`)}
            className="text-gray-500 underline hover:text-red-500"
          >
            キャンセル
          </Button>
        </div>
      </Card>
    </div>
  );
}
