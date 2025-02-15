"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function EditDoc({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [doc, setDoc] = useState<{ title: string; body: string } | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    async function fetchDoc() {
      const { data } = await supabase
        .from("docs")
        .select("title, body")
        .eq("id", Number(params.id))
        .single();

      if (data) {
        setDoc(data);
        setTitle(data.title);
        setBody(data.body);
      }
    }

    fetchDoc();
  }, [params.id]);

  const handleSave = async () => {
    await supabase
      .from("docs")
      .update({ title, body })
      .eq("id", Number(params.id));

    router.push(`/docs/${params.id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Edit Document</h1>

      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
      />

      <textarea
        className="w-full p-2 border border-gray-300 rounded-md"
        rows={10}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Enter body"
      />

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
        <button
          onClick={() => router.push(`/docs/${params.id}`)}
          className="bg-gray-300 px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
