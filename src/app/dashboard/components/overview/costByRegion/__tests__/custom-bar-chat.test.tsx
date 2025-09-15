import { CustomBarChart } from "@/components/charts/bar-chat";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("CustomBarChart", () => {
  const mockData = [
    { month: "January", sales: 1200, profit: 400 },
    { month: "February", sales: 1800, profit: 600 },
    { month: "March", sales: 950, profit: 300 },
  ];

  const defaultProps = {
    data: mockData,
    xAxisKey: "month",
    yAxisKey: "sales",
  };

  it("renders all data items with correct values", () => {
    render(<CustomBarChart {...defaultProps} />);
    expect(screen.getByText("January")).toBeInTheDocument();
  });
});
