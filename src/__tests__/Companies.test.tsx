import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Companies from "@/components/Companies";
import { supabase } from "@/lib/supabase";

jest.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn().mockResolvedValue({
        data: { session: { user: { email: "test@example.com" } } },
        error: null,
      }),
      signOut: jest.fn().mockResolvedValue({ error: null }),
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue({
        data: [{ id: 1, name: "Test Company", website: "https://test.com", memo: "Test Memo" }],
        error: null,
      }),
    }),
  },
}));

describe("Companies Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("企業一覧ページが正しくレンダリングされる", async () => {
    supabase.auth.getSession.mockResolvedValueOnce({
      data: { session: { user: { email: "test@example.com" } } },
      error: null,
    });

    supabase.auth.onAuthStateChange.mockImplementation((callback) => {
      const unsubscribe = jest.fn();
      callback("SIGNED_IN", { user: { email: "test@example.com" } });

      return { data: { subscription: { unsubscribe } } };
    });

    render(<Companies />);

    await waitFor(() => {
      expect(screen.getByText("企業")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Test Company")).toBeInTheDocument();
    });
  });

  it("未認証の状態では 'ログイン' ボタンが表示される", async () => {
    supabase.auth.getSession.mockResolvedValueOnce({ data: { session: null }, error: null });

    supabase.auth.onAuthStateChange.mockImplementation((callback) => {
      const unsubscribe = jest.fn();
      callback("SIGNED_OUT", null);
      return { data: { subscription: { unsubscribe } } };
    });

    render(<Companies />);

    await waitFor(() => {
      expect(screen.getByText("ログイン")).toBeInTheDocument();
    });
  });

  it("認証済みの状態では 'ログアウト' ボタンが表示される", async () => {
    supabase.auth.getSession.mockResolvedValueOnce({
      data: { session: { user: { email: "test@example.com" } } },
      error: null,
    });

    supabase.auth.onAuthStateChange.mockImplementation((callback) => {
      const unsubscribe = jest.fn();
      callback("SIGNED_IN", { user: { email: "test@example.com" } });
      return { data: {subscription: { unsubscribe } } };
    });

    render(<Companies />);

    await waitFor(() => {
      expect(screen.getByText("ログアウト")).toBeInTheDocument();
    });
  });

  it("ログアウトボタンをクリックすると signOut が呼ばれる", async () => {
    supabase.auth.getSession.mockResolvedValueOnce({
      data: { session: { user: { email: "test@example.com" } } },
      error: null,
    });

    supabase.auth.signOut.mockResolvedValueOnce({ error: null });

    supabase.auth.onAuthStateChange.mockImplementation((callback) => {
      const unsubscribe = jest.fn();
      callback("SIGNED_IN", { user: { email: "test@example.com" } });
      return { data: { subscription: { unsubscribe } } };
    });

    render(<Companies />);

    const logoutButton = await screen.findByText("ログアウト");
    await userEvent.click(logoutButton);
    await waitFor(() => {
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });
});
