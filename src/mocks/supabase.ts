import { createClient } from "@/utils/supabase/server";
import { AuthError } from "@supabase/supabase-js";

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

export const mockAuthError = async (error: AuthError) => {
  const client = await createClient();
  jest.spyOn(client.auth, "getUser").mockRejectedValue(error);
};
