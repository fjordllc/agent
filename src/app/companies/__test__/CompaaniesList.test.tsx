import { render, screen } from "@testing-library/react";
import CompaniesList from "../CompaniesList";
import { BrowserRouter } from "react-router-dom";

const companies = [
  { id: 1, created_at: "2025-02-17T12:00:00Z", name: "株式会社ロッカ", website: "https://lokka.jp", memo: "良い会社" },
  { id: 2, created_at: "2025-02-17T12:30:00Z", name: "株式会社リンゴ", website: "https://example.com/apple", memo: "リンゴは良い会社" },
];

describe("CompaniesList コンポーネント", () => {
  it("企業一覧の見出しが表示される", () => {
    render(
      <BrowserRouter>
        <CompaniesList companies={companies} />
      </BrowserRouter>
    );

    expect(screen.getByText("企業一覧")).toBeInTheDocument();
  });

  it("企業データ（ID, 名前, URL, メモ）が正しく表示される", () => {
    render(
      <BrowserRouter>
        <CompaniesList companies={companies} />
      </BrowserRouter>
    );

    expect(screen.getByText("株式会社ロッカ")).toBeInTheDocument();
    expect(screen.getByText("株式会社リンゴ")).toBeInTheDocument();
    expect(screen.getByText("https://lokka.jp")).toBeInTheDocument();
    expect(screen.getByText("https://example.com/apple")).toBeInTheDocument();
  });
});
