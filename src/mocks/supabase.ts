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
