const { createClient } = require("@/utils/supabase/server");

export type AuthCredential = {
  email: string;
  password: string;
};

export const mockUserLoggedIn = (user?: AuthCredential) => {
  createClient().auth.getUser.mockResolvedValueOnce({
    data: { user: user },
  });
};

export const mockAuthError = (error: string) => {
  createClient().auth.getUser.mockRejectedValueOnce({
    error: error,
  });
};
