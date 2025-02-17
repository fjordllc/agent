import { render, screen, waitFor } from "@testing-library/react";
import Header from "./Header";
import { AuthCredential, mockUserLoggedIn } from "@/mocks/supabase";

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
    beforeEach(async () => {
      const testUser: AuthCredential = {
        email: "test@test.com",
        password: "test",
      };
      mockUserLoggedIn(testUser);
    });

    test("Should display logout button", async () => {
      render(await Header());
      await waitFor(() => {
        expect(screen.getByText("ログアウト")).toBeInTheDocument();
      });
    });
  });

  describe("When user is logged out", () => {
    beforeEach(async () => {
      mockUserLoggedIn();
    });

    test("Should display signin and login button", async () => {
      render(await Header());
      await waitFor(() => {
        expect(screen.getByText("ユーザー登録")).toBeInTheDocument();
        expect(screen.getByText("ログイン")).toBeInTheDocument();
      });
    });
  });

});
