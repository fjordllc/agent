import { cleanup, render, screen, waitFor } from "@testing-library/react";
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

const mockUseDocs = (override = {}) => {
  return {
    docs: [
      {
        title: "test 1",
        body: "This is a sample note.",
        created_at: "2025-02-07T10:00:00Z",
        updated_at: "2025-02-07T12:00:00Z",
        user_id: "123",
        last_updated_user_id: "123",
      },
      {
        title: "test 2",
        body: "Another test note.",
        created_at: "2025-02-06T14:30:00Z",
        updated_at: "2025-02-07T09:45:00Z",
        user_id: "456",
        last_updated_user_id: "789",
      },
      {
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

describe("Rendering test for DocList component", () => {
  beforeEach(() => {
    (useDocs as jest.Mock).mockReturnValue(mockUseDocs());
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should show proper doc items", () => {
    render(<DocList itemsPerPage={2} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
