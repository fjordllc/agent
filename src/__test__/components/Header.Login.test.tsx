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

test("Header renders correctly for logged-out users", async () => {
  render(await Header());

  await waitFor(() => {
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByText("ログアウト"));
  });
});