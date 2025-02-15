
import { createDoc } from "../_actions/createDoc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SingleLayout from "@/components/layouts/SingleLayout";

export default function EditDoc() {
  return (
    <SingleLayout>
      <div className="flex justify-center items-center min-h-screen p-6 relative">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>ドキュメント作成</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createDoc}>
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
                <Button type="submit">Docを公開</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </SingleLayout>
  );
}
