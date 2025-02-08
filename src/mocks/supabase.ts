import { createClient } from "@/utils/supabase/server";

export type AuthCredential = {
  email: string;
  password: string;
};

export const mockUserLoggedIn = async (user?: AuthCredential) => {
  const client = await createClient();
  (client.auth.getUser as jest.Mock).mockResolvedValueOnce({
    data: { user },
  });
};

// Jest Mock: Supabaseの認証とデータ取得のモック
jest.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      getSession: jest.fn(() =>
        Promise.resolve({
          data: { session: { user: { id: "test-user" } } },
          error: null,
        })
      ),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      onAuthStateChange: jest.fn().mockImplementation((callback) => {
        callback("SIGNED_IN", { user: { id: "test-user" } });
        return { unsubscribe: jest.fn() };
      }),
    },
    from: jest.fn(() => ({
      select: jest.fn().mockResolvedValue({
        data: [{ id: 1, name: "Test Company" }],
        error: null,
      }),
    })),
  },
}));
