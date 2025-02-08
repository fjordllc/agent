import { render, screen } from "@testing-library/react";
import DocList from "@/components/DocList";
import useDocs from "@/hooks/useDocs";
import { mockUseDocs } from "@/mocks/supabase";

jest.mock("@/lib/supabase", () => ({
  createClient: jest.fn().mockReturnValue({
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: [], error: null }),
    }),
  }),
}));

jest.mock("../hooks/useDocs");

describe("Rendering test for DocList and Pagination components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("render DocList Component", () => {
    test("should show proper doc items", () => {
      (useDocs as jest.Mock).mockReturnValue(mockUseDocs());
      render(<DocList itemsPerPage={2} />);

      expect(screen.getByText("test 1")).toBeInTheDocument();
      expect(screen.getByText("test 2")).toBeInTheDocument();
      expect(screen.getByText("test 3")).toBeInTheDocument();
    });
  });
});
