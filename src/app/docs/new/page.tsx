import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SingleLayout from "@/components/layouts/SingleLayout";
import { NewDocForm } from "../_components/newDocForm";

export default function NewDoc() {
  return (
    <SingleLayout>
      <div className="flex justify-center items-center min-h-screen p-6 relative">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>ドキュメント作成</CardTitle>
          </CardHeader>
          <CardContent>
            <NewDocForm />
          </CardContent>
        </Card>
      </div>
    </SingleLayout>
  );
}
