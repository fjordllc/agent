import { createClient } from "@/utils/supabase/server";

export type AuthCredential = {
  email: string;
  password: string;
};

export type Document = {
  id: string;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  last_updated_user_id: string;
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

export const mockDocs = async (docs: Document[]) => {
  const client = await createClient();
  (client.from as jest.Mock).mockReturnValue({
    select: jest.fn().mockResolvedValueOnce({ data: docs, error: null }),
  });
};
>>>>>>> d9d6952 (Docs のモック関数を mocks/supabase.ts に切り分ける)
