import "@/app/globals.css";
import Link from "next/link";
import SingleLayout from "@components/layouts/SingleLayout";

export default async function Index() {
  return (
    <SingleLayout>
      <h2>トップページ</h2>
      <ul>
        <li>
          <Link href="/dashboard">ダッシュボード</Link>
        </li>
      </ul>
    </SingleLayout>
  );
}
