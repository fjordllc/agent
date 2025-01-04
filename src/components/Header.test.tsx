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

  const renderHeaderWithUser = async (user?: AuthUser) => {
    createClient().auth.getUser.mockResolvedValueOnce({
      data: { user },
    });
    render(await Header());
  };

  it("ユーザーが未ログインの場合の描写", async () => {
    renderHeaderWithUser();
    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(5);
      expect(screen.getByText("ユーザー登録"));
      expect(screen.getByText("ログイン"));
    });
  });

  it("ユーザーがログインの場合の描写", async () => {
    const user: AuthUser = {
      email: "test@test.com",
      password: "test"
    }
    renderHeaderWithUser(user);
    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(4);
      expect(screen.getByText("ログアウト"));
    });
  });
});
