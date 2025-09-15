import { render, screen } from "@testing-library/react";
import { DollarSign } from "lucide-react";
import { MetricCard } from "../metric-card";

describe("MetricCard", () => {
  const baseProps = {
    icon: DollarSign,
    title: "Revenue",
    value: "$1000",
  };

  const trend = { positive: true, value: "+10%" };

  it("renders title and value", () => {
    render(<MetricCard {...baseProps} trend={trend} />);

    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$1000")).toBeInTheDocument();
  });

  it("shows TrendingUp when trend is positive", () => {
    const { container } = render(<MetricCard {...baseProps} trend={trend} />);

    const trendingUpIcon = container.querySelector(".trending-up");

    expect(trendingUpIcon).toBeInTheDocument();
    expect(screen.getByText("+10%")).toBeInTheDocument();
  });

  it("shows TrendingDown when trend is negative", () => {
    const { container } = render(
      <MetricCard {...baseProps} trend={{ positive: false, value: "-5%" }} />
    );
    const trendingDownIcon = container.querySelector(".trending-down");

    expect(trendingDownIcon).toBeInTheDocument();
    expect(screen.getByText("-5%")).toBeInTheDocument();
  });
});
