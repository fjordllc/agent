import { createClient } from "@/utils/supabase/server";
import { AuthError } from "@supabase/supabase-js";
import { jest } from "@jest/globals";

export type AuthCredential = {
  email: string;
  password: string;
};

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
      getUser: jest.fn().mockResolvedValue({
        data: { user: { id: "test-user", email: "test@example.com" } },
      }),
    },
    from: jest.fn((table: string) => {
      if (table === "companies") {
        return {
          select: jest.fn().mockResolvedValue({
            data: [{ id: 1, name: "Test Company", website: "https://test.com", memo: "Sample memo" }],
            error: null,
          }),
        };
      }
      return { select: jest.fn().mockResolvedValue({ data: null, error: null }) };
    }),
  },
}));

export const mockUserLoggedIn = async (user?: AuthCredential) => {
  const client = await createClient();
  (client.auth.getUser as jest.Mock).mockResolvedValueOnce({
    data: { user },
  });
};

export const mockAuthError = async (error: AuthError) => {
  const client = await createClient();
  (client.auth.getUser as jest.Mock).mockRejectedValue(error);
};
