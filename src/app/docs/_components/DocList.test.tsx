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

jest.mock("@/hooks/useDocs");

const mockUseDocs = (override = {}) => {
  return {
    docs: [
      {
        id: "acfeb157-6c90-4d70-ad96-1d6361c1874e",
        title: "test 1",
        body: "This is a sample note.",
        created_at: "2025-02-07T10:00:00Z",
        updated_at: "2025-02-07T12:00:00Z",
        user_id: "123",
        last_updated_user_id: "123",
      },
      {
        id: "acfeb157-6c90-4d70-ad96-1d6361c1874a",
        title: "test 2",
        body: "Another test note.",
        created_at: "2025-02-06T14:30:00Z",
        updated_at: "2025-02-07T09:45:00Z",
        user_id: "456",
        last_updated_user_id: "789",
      },
      {
        id: "bcfeb157-6c90-4d70-ad96-1d6361c1874e",
        title: "test 3",
        body: "Third test note.",
        created_at: "2025-02-06T14:30:00Z",
        updated_at: "2025-02-07T09:45:00Z",
        user_id: "555",
        last_updated_user_id: "666",
      },
    ],
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
