import { render, screen, waitFor } from "@testing-library/react";
import Header from "./Header";

jest.mock("@/utils/supabase/server", () => ({
  createClient: jest.fn().mockReturnValue({
    auth: {
      getUser: jest.fn(),
    },
  }),
}));

describe("Rendering test for the Header component", () => {
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

  it("User is NOT logged in", async () => {
    renderHeaderWithUser();
    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(5);
      expect(screen.getByText("ユーザー登録"));
      expect(screen.getByText("ログイン"));
    });
  });

  it("User is logged in with valied email and password", async () => {
    const user: AuthUser = {
      email: "test@test.com",
      password: "test",
    };
    renderHeaderWithUser(user);
    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(4);
      expect(screen.getByText("ログアウト"));
    });
  });

  it("getUser がエラーをスローする場合", async () => {
    createClient().auth.getUser.mockRejectedValueOnce(
      {
        error: "email_address_invalid"
      }
    );
    render(await Header());

    await waitFor(() => {
      expect(screen.getByText("ユーザー登録")).toBeInTheDocument();
      expect(screen.getByText("ログイン")).toBeInTheDocument();
      expect(screen.queryByText("ログアウト")).not.toBeInTheDocument();
    });
  });

});
