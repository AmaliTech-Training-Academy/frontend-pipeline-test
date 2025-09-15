import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchForm } from "@/app/dashboard/components/search-form";

describe("SearchForm", () => {
  it("renders search input with placeholder", () => {
    render(<SearchForm />);

    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("allows typing in the input field", async () => {
    render(<SearchForm />);

    const input = await screen.findByTestId("search-input");
    fireEvent.change(input, { target: { value: "test query" } });

    expect(input).toHaveValue("test query");
  });
});
