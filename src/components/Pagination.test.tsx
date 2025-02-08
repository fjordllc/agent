import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "./Pagination";

describe("render Pagination Component", () => {
  const onPageChange = jest.fn();

  test("renders pagination buttons correctly", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getByTitle("First Page")).toBeInTheDocument();
    expect(screen.getByTitle("Previous Page")).toBeInTheDocument();
    expect(screen.getByTitle("Next Page")).toBeInTheDocument();
    expect(screen.getByTitle("Last Page")).toBeInTheDocument();

    expect(screen.getByText("3")).toHaveStyle("background-color: #007bff");
    expect(screen.getByText("4")).toHaveStyle("background-color: #f8f9fa");
  });

  test("disables first and previous buttons on the first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getByTitle("First Page")).toBeDisabled();
    expect(screen.getByTitle("Previous Page")).toBeDisabled();
  });

  test("disables next and last buttons on the last page", () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getByTitle("Next Page")).toBeDisabled();
    expect(screen.getByTitle("Last Page")).toBeDisabled();
  });

  test("calls onPageChange when a page number is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByText("5"));
    expect(onPageChange).toHaveBeenCalledWith(5);
  });

  test("calls onPageChange when navigation buttons are clicked", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByTitle("First Page"));
    expect(onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByTitle("Previous Page"));
    expect(onPageChange).toHaveBeenCalledWith(4);

    fireEvent.click(screen.getByTitle("Next Page"));
    expect(onPageChange).toHaveBeenCalledWith(6);

    fireEvent.click(screen.getByTitle("Last Page"));
    expect(onPageChange).toHaveBeenCalledWith(10);
  });
});
