import { render, screen, waitFor } from "@testing-library/react";
import Header from "../../components/Header";

// Mock the Supabase client
jest.mock("@/utils/supabase/server", () => ({
  createClient: jest.fn().mockReturnValue({
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: { user: "admin@test.com" },
      }),
    },
  }),
}));

test("ログイン状態でヘッダーが正常に描写", async () => {
  render(await Header());

  await waitFor(() => {
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByText("ログアウト"));
  });
});
