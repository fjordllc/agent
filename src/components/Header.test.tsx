import { render, screen, waitFor } from "@testing-library/react";
import { AuthCredential } from "@/types/authCredential";
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

  const renderHeaderWithUser = async (authCredential?: AuthCredential) => {
    createClient().auth.getUser.mockResolvedValueOnce({
      data: { user: authCredential },
    });
    render(await Header());
  };

  describe("When user is logged in", () => {
    test("Should display logout button", async () => {
      const testUser: AuthCredential = {
        email: "test@test.com",
        password: "test",
      };
      renderHeaderWithUser(testUser);
      await waitFor(() => {
        expect(screen.getAllByRole("listitem")).toHaveLength(4);
        expect(screen.getByText("ログアウト"));
      });
    });
  });

  describe("When user is logged out", () => {
    test("Should display signin and login button", async () => {
      renderHeaderWithUser();
      await waitFor(() => {
        expect(screen.getAllByRole("listitem")).toHaveLength(5);
        expect(screen.getByText("ユーザー登録"));
        expect(screen.getByText("ログイン"));
      });
    });
  });

  describe("When user is failed to log in", () => {
    test("Should display error message", async () => {
      createClient().auth.getUser.mockRejectedValueOnce({
        error: "email_address_invalid",
      });
      render(await Header());
      await waitFor(() => {
        expect(screen.getByText("ユーザー登録")).toBeInTheDocument();
        expect(screen.getByText("ログイン")).toBeInTheDocument();
        expect(screen.queryByText("ログアウト")).not.toBeInTheDocument();
      });
    });
  });
});
