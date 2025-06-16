import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppPageHeader from "@/components/AppPageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NewCompanyForm from "../_components/NewCompanyForm";

export default function NewCompany() {
  return (
    <div id="app-docs-new">
      <AppPageHeader title="Docs">
        <Button asChild>
          <Link href="/docs/new">企業追加</Link>
        </Button>
      </AppPageHeader>
      <div id="app-page-body">
        <div className="container">
          <div className="flex justify-center p-6 relative">
            <Card className="w-full max-w-xl">
              <CardHeader>
                <CardTitle>企業追加</CardTitle>
              </CardHeader>
              <CardContent>
                <NewCompanyForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
