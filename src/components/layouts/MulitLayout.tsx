import Header from "@components/Header";
import Footer from "@components/Footer";
import Link from "next/link";

export default function MultiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <div className="flex flex-row">
        <div className="bg-base-200 basis-1/4">
        
        <ul>
          <li><Link href="/dashboard">ダッシュボード</Link></li>
          <li><Link href="/companies">企業</Link></li>
          <li><Link href="/offers">求人</Link></li>
          <li><Link href="/job_hunters">求職者</Link></li>
        </ul>
        
        </div>
        <div className="bg-base-200 basis-3/4">{children}</div>
      </div>

      <Footer />
    </>
  );
}
