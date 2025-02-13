import "@/app/globals.css";
import Link from "next/link";
import SingleLayout from "@components/layouts/SingleLayout";

const links = [
  { href: "/dashboard", text: "ダッシュボード" },
  { href: "/docs", text: "Docs" },
];

export default async function Index() {
  return (
    <SingleLayout>
      <h2>トップページ</h2>
      <ul>
        {links.map((link, index) => (
          <li className="nav-menu-item" key={index}>
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </SingleLayout>
  );
}
