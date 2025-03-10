"use client";

import dynamic from "next/dynamic";

const ErrorToaster = dynamic(() => import("@/components/toast/ErrorToaster"), {
  ssr: false,
});

interface ClientErrorToasterProps {
  errors: Array<{ code: string; message: string } | null>;
  title?: string;
}

export default function ClientErrorToaster({
  errors,
  title,
}: ClientErrorToasterProps) {
  return <ErrorToaster errors={errors} title={title} />;
}
