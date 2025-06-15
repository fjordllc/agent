import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import "@testing-library/jest-dom";

describe("Footer component", () => {
  it("should display the correct link for the operating company", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: "運営企業" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://lokka.jp");
  });
});
