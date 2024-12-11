export default function Footer() {
  const footerItems = [
    { text: "プライバシーポリシー", url: "/privacy-policy" },
    { text: "利用規約", url: "/tos" },
  ];

  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        {footerItems.map((item, index) => (
          <li key={index} style={{ margin: "0" }}>
            <a
              href={item.url}
              style={{
                textDecoration: "none",
                color: "#007bff",
                padding: "5px 10px",
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>

      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Lokka,
          inc.
        </p>
      </aside>
    </footer>
  );
}
