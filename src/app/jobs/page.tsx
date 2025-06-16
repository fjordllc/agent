"use client";

import AppPageHeader from "@/components/AppPageHeader";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CompaniesPage() {
  return (
    <div id="app-companies-index">
      <AppPageHeader title="求人">
        <Button asChild>
          <Link href="/companies/new">求人追加</Link>
        </Button>
      </AppPageHeader>
      <div id="app-page-body">
      </div>
    </div>
  );
}
