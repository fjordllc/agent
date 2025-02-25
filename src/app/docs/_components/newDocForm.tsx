"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createDoc } from "../_actions/createDoc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function NewDocForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const result = await createDoc(formData);

    if (result?.error) {
      toast({
        title: "エラー",
        description: result.error,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-2">タイトル</p>
      <Input
        type="text"
        name="title"
        placeholder="Enter title"
        className="mb-4"
        required
      />

      <p className="mb-2">本文</p>
      <Textarea
        rows={10}
        name="body"
        placeholder="Enter body"
        className="mb-4"
        required
      />

      <div className="mb-4 flex justify-center items-center">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "送信中..." : "Docを公開"}
        </Button>
      </div>
    </form>
  );
}
