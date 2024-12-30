import React from "react";
import { render, screen } from "@testing-library/react";
import Auth from "../../components/Auth";

test("Auth の初めてのテスト", () => {
  render(<Auth />);

  expect(screen.getByText("ログイン")).toBeInTheDocument();
});
