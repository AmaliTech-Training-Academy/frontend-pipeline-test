import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CircularProgress } from "../circular-progress";

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  PieChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pie-chart">{children}</div>
  ),
  Pie: ({ data, dataKey }: { data: any[]; dataKey: string }) => (
    <div
      data-testid="pie"
      data-chart-data={JSON.stringify(data)}
      data-key={dataKey}
    />
  ),
  Cell: ({ fill }: { fill: string }) => (
    <div data-testid="cell" data-fill={fill} />
  ),
}));

describe("CircularProgress", () => {
  it("renders the percentage text correctly", () => {
    render(<CircularProgress value={65} />);

    expect(screen.getByText("65%")).toBeInTheDocument();
  });
  it("passes correct data to pie chart", () => {
    render(<CircularProgress value={75} />);

    const pieElement = screen.getByTestId("pie");
    const chartData = JSON.parse(
      pieElement.getAttribute("data-chart-data") || "[]"
    );

    expect(chartData).toEqual([
      { name: "used", value: 75 },
      { name: "unused", value: 25 },
    ]);
    expect(pieElement.getAttribute("data-key")).toBe("value");
  });

  it("calculates unused value correctly for various inputs", () => {
    const testCases = [
      { input: 25, expectedUsed: 25, expectedUnused: 75 },
      { input: 50, expectedUsed: 50, expectedUnused: 50 },
      { input: 1, expectedUsed: 1, expectedUnused: 99 },
      { input: 99, expectedUsed: 99, expectedUnused: 1 },
    ];

    testCases.forEach(({ input, expectedUsed, expectedUnused }) => {
      const { unmount } = render(<CircularProgress value={input} />);

      const pieElement = screen.getByTestId("pie");
      const chartData = JSON.parse(
        pieElement.getAttribute("data-chart-data") || "[]"
      );

      expect(chartData[0]).toEqual({ name: "used", value: expectedUsed });
      expect(chartData[1]).toEqual({ name: "unused", value: expectedUnused });

      unmount();
    });
  });

  it("renders with proper structure and classes", () => {
    render(<CircularProgress value={45} />);
    const percentageText = screen.getByText("45%");
    expect(percentageText).toHaveClass("text-lg", "font-semibold");
  });

  it("renders chart components in correct structure", () => {
    render(<CircularProgress value={30} />);

    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
    expect(screen.getByTestId("pie")).toBeInTheDocument();
  });
});
