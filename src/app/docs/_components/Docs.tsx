import Link from "next/link";
import DocList from "./DocList";
import { Button } from "@/components/ui/button";

export default function Docs() {
  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Docs</h1>
        <Link href="/docs/new">
          <Button className="mr-12 border border-black bg-white text-gray-800 px-6 py-1 rounded-md">
            Doc作成
          </Button>
        </Link>
      </div>
      <DocList itemsPerPage={20} />
    </div>
  );
}
