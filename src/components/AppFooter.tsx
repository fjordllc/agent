import Link from "next/link";

export default function AppFooter() {
  const footerItems = [
    { text: "利用規約", url: "/tos" },
    { text: "プライバシーポリシー", url: "/privacy" },
  ];

  return (
    <footer id="app-footer" className="bg-white border-t py-6 md:py-0">
      <div className="container">
        <div className="flex flex-col items-center gap-4 md:h-24 md:flex-row md:justify-between md:gap-0">
          <div className="flex flex-wrap justify-center gap-4">
            {footerItems.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {item.text}
              </Link>
            ))}
          </div>
          <small className="block text-center text-sm text-muted-foreground md:text-right">
            Copyright © {new Date().getFullYear()} - All right reserved by Lokka,
            inc.
          </small>
        </div>
      </div>
    </footer>
  );
}
