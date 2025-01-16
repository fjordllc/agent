import { render, screen, waitFor } from "@testing-library/react";
import Header from "./Header";
import {
  AuthCredential,
  mockAuthError,
  mockUserLoggedIn,
} from "@/mocks/supabase";

jest.mock("@/utils/supabase/server", () => ({
  createClient: jest.fn().mockReturnValue({
    auth: {
      getUser: jest.fn(),
    },
  }),
}));

describe("Rendering test for the Header component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("When user is logged in", () => {
    test("Should display logout button", async () => {
      const testUser: AuthCredential = {
        email: "test@test.com",
        password: "test",
      };
      mockUserLoggedIn(testUser);
      render(await Header());
      await waitFor(() => {
        expect(screen.getByText("ログアウト")).toBeInTheDocument();
      });
    });
  });

  describe("When user is logged out", () => {
    test("Should display signin and login button", async () => {
      mockUserLoggedIn();
      render(await Header());
      await waitFor(() => {
        expect(screen.getByText("ユーザー登録")).toBeInTheDocument();
        expect(screen.getByText("ログイン")).toBeInTheDocument();
      });
    });
  });

  describe("When user is failed to log in", () => {
    test("Should display error message", async () => {
      mockAuthError("email_address_invalid");
      render(await Header());
      await waitFor(() => {
        expect(screen.getByText("ユーザー登録")).toBeInTheDocument();
        expect(screen.getByText("ログイン")).toBeInTheDocument();
        expect(screen.queryByText("ログアウト")).not.toBeInTheDocument();
      });
    });
  });
});
