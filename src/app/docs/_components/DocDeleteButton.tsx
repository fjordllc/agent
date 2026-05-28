"use client";

import { Button } from "@/components/ui/button";
import { deleteDoc } from "@/app/docs/_actions/deleteDoc";

export default function DocDeleteButton({ id }: { id: string }) {
  return (
    <form
      action={deleteDoc}
      onSubmit={(event) => {
        if (!confirm("本当によろしいですか？")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        variant="ghost"
        className="text-gray-500 underline hover:text-red-500"
      >
        削除する
      </Button>
    </form>
  );
}
