import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DocList from "../components/DocList";
import useDocs from "../hooks/useDocs";

jest.mock("../lib/supabase", () => ({
  createClient: jest.fn().mockReturnValue({
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: [], error: null }),
    }),
  }),
}));

jest.mock("../hooks/useDocs");

const mockSetCurrentPage = jest.fn();

const mockUseDocs = (override = {}) => {
  return {
    docs: [
      { id: "1", title: "Doc 1", body: "Content 1" },
      { id: "2", title: "Doc 2", body: "Content 2" },
      { id: "3", title: "Doc 3", body: "Content 3" },
      { id: "4", title: "Doc 4", body: "Content 4" },
      { id: "5", title: "Doc 5", body: "Content 5" },
      { id: "6", title: "Doc 6", body: "Content 6" },
    ],
    currentPage: 1,
    totalPages: 3,
    loading: false,
    setCurrentPage: mockSetCurrentPage,
    ...override,
  };
};

describe("Rendering test for DocList component", () => {
  beforeEach(() => {
    (useDocs as jest.Mock).mockReturnValue(mockUseDocs());
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render loading is false", () => {
    render(<DocList itemsPerPage={2} />);

    expect(screen.getByText("Doc 1")).toBeInTheDocument();
    expect(screen.getByText("Doc 2")).toBeInTheDocument();
    expect(screen.getByText("Doc 3"))!.toBeInTheDocument();
  });
});
