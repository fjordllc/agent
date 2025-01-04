import { render, screen, waitFor } from "@testing-library/react";
import Header from "./Header";

jest.mock("@/utils/supabase/server", () => ({
  createClient: jest.fn().mockReturnValue({
    auth: {
      getUser: jest.fn(),
    },
  }),
}));

describe("Header コンポネントの描写テスト", () => {
  const { createClient } = require("@/utils/supabase/server");
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderHeaderWithUser = async (user: string | null) => {
    createClient().auth.getUser.mockResolvedValueOnce({
      data: { user },
    });
    render(await Header());
  };

  it("ユーザーが未ログインの場合の描写", async () => {
    renderHeaderWithUser(null);
    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(5);
      expect(screen.getByText("ユーザー登録"));
      expect(screen.getByText("ログイン"));
    });
  });

  it("ユーザーがログインの場合の描写", async () => {
    renderHeaderWithUser("admin@test.com");
    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(4);
      expect(screen.getByText("ログアウト"));
    });
  });
});
