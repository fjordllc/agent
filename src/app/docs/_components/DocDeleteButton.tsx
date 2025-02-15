"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabase";

export default function DocDeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const onDelete = async () => {
    if (!confirm("本当によろしいですか？")) return;

    const { error } = await supabase.from("docs").delete().eq("id", Number(id));

    if (error) {
      console.error(`Error deleting document: ${error.code} ${error.message}`);
      return;
    }

    router.replace("/docs");
  };

  return (
    <Button
      onClick={onDelete}
      variant="ghost"
      className="text-gray-500 underline hover:text-red-500"
    >
      削除する
    </Button>
  );
}
