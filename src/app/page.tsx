import "@/app/globals.css";
import Link from "next/link";
import WelcomeLayout from "@components/layouts/WelcomeLayout";
import WelcomeBody from "@/app/welcome/_components/WelcomeBody";

const links = [
  { href: "/dashboard", text: "ダッシュボード" },
  { href: "/docs", text: "Docs" },
];

export default async function Index() {
  return (
    <>
      <WelcomeLayout>
        <div id="welcome-page">
          <WelcomeBody />
          <div className="container">
            <ul>
              {links.map((link, index) => (
                <li className="nav-menu-item" key={index}>
                  <Link href={link.href}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </WelcomeLayout>
    </>
  );
}
