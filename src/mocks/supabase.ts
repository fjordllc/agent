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
