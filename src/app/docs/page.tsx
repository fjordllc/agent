import "@/app/globals.css";
import AppPageHeader from "@/components/AppPageHeader";
import { Button } from "@/components/ui/button";
import Docs from "@/app/docs/_components/Docs";
import Link from "next/link";

export default async function DocsPage() {
  return (
    <div id="app-docs-index">
      <AppPageHeader title="Docs">
        <Button asChild>
          <Link href="/docs/new">Doc作成</Link>
        </Button>
      </AppPageHeader>
      <div id="app-page-body">
        <Docs itemsPerPage={20} />
      </div>
    </div>
  );
}
