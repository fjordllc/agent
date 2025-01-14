import { render, screen } from "@testing-library/react";
import Auth from "../../components/Auth";

test("Auth が正しく描写されているかチェックする", () => {
  render(<Auth />);

  expect(screen.getByText("ログイン")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "ログインメールを送る" })
  ).toBeInTheDocument();
});
