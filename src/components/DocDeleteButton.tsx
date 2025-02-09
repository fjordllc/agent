"use client";

import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function DocDeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const onDelete = async () => {
    if (!confirm("Are you sure you want to delete this document?")) return;

    const { error } = await supabase.from("docs").delete().eq("id", Number(id));

    if (error) {
      console.error("Error deleting document:", error);
      return;
    }

    router.push("/docs");
  };

  return (
    <button
      onClick={onDelete}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      ドキュメントを削除する
    </button>
  );
}
