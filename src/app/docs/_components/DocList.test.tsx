import { render, screen } from "@testing-library/react";
import DocList from "@/app/docs/_components/DocList";
import { useDocs } from "@/hooks/useDocs";

jest.mock("@/lib/supabase", () => ({
  createClient: jest.fn().mockReturnValue({
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: [], error: null }),
    }),
  }),
}));

jest.mock("@/hooks/useDocs", () => ({
  useDocs: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  })),
  usePathname: jest.fn(() => "/"),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  notFound: jest.fn(),
  redirect: jest.fn(),
}));

const mockUseDocs = (override = {}) => {
  return {
    docs: [
      {
        id: 1,
        title: "test 1",
        body: "This is a sample note.",
        created_at: "2025-02-07T10:00:00Z",
        updated_at: "2025-02-07T12:00:00Z",
        user_id: "123",
        last_updated_user_id: "123",
      },
      {
        id: 2,
        title: "test 2",
        body: "Another test note.",
        created_at: "2025-02-06T14:30:00Z",
        updated_at: "2025-02-07T09:45:00Z",
        user_id: "456",
        last_updated_user_id: "789",
      },
      {
        id: 3,
        title: "test 3",
        body: "Third test note.",
        created_at: "2025-02-06T14:30:00Z",
        updated_at: "2025-02-07T09:45:00Z",
        user_id: "555",
        last_updated_user_id: "666",
      },
    ],
    totalPages: 1,
    loading: false,
    ...override,
  };
};

describe("Rendering test for DocList and Pagination components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("render DocList Component", () => {
    test("should show proper doc items", () => {
      (useDocs as jest.Mock).mockReturnValue(mockUseDocs());
      render(<DocList itemsPerPage={20} />);

      expect(screen.getByText("test 1")).toBeInTheDocument();
      expect(screen.getByText("test 2")).toBeInTheDocument();
      expect(screen.getByText("test 3")).toBeInTheDocument();
    });
  });
});
