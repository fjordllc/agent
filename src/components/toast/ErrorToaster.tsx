"use client";

import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface ErrorToasterProps {
  errors: Array<{ code: string; message: string } | null>;
  title?: string;
}

export default function ErrorToaster({ errors, title }: ErrorToasterProps) {
  useEffect(() => {
    errors.forEach((error) => {
      if (error) {
        toast({
          title: title ?? "Error",
          description: `${error.code} ${error.message}`,
          variant: "destructive",
        });
      }
    });
  }, [title, errors]);

  return null;
}
