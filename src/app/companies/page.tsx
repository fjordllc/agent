"use client";

import AppPageHeader from "@/components/AppPageHeader";
import Companies from "@/app/companies/_components/Companies";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CompaniesPage() {
  return (
    <div id="app-companies-index">
      <AppPageHeader title="企業">
        <Button asChild>
          <Link href="/companies/new">企業追加</Link>
        </Button>
      </AppPageHeader>
      <div id="app-page-body">
        <div className="container">
          <div className="flex flex-col items-center py-8 gap-6">
            <Companies />
          </div>
        </div>
      </div>
    </div>
  );
}
