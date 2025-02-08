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
<<<<<<< HEAD
=======

export const mockAuthError = async (error: AuthError) => {
  const client = await createClient();
  (client.auth.getUser as jest.Mock).mockRejectedValue(error);
};

export const mockUseDocs = (override = {}) => {
  return {
    docs: [
      {
        id: "acfeb157-6c90-4d70-ad96-1d6361c1874e",
        title: "test 1",
        body: "This is a sample note.",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: "123",
        last_updated_user_id: "123",
      },
      {
        id: "acfeb157-6c90-4d70-ad96-1d6361c1874a",
        title: "test 2",
        body: "Another test note.",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: "456",
        last_updated_user_id: "789",
      },
      {
        id: "bcfeb157-6c90-4d70-ad96-1d6361c1874e",
        title: "test 3",
        body: "Third test note.",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: "555",
        last_updated_user_id: "666",
      },
    ],
    ...override,
  };
};
>>>>>>> d9d6952 (Docs のモック関数を mocks/supabase.ts に切り分ける)
