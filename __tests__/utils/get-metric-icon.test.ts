import { describe, it, expect } from "vitest";
import {
  DollarSign,
  TrendingUp,
  Target,
  AlertTriangle,
  Database,
  Globe,
  Users,
  Zap,
  CircleDashedIcon,
} from "lucide-react";
import { getMetricIcon } from "@/utils/get-metric-icon";

describe("getMetricIcon", () => {
  it("returns DollarSign for 'Total Spend'", () => {
    expect(getMetricIcon("Total Spend")).toBe(DollarSign);
  });

  it("returns TrendingUp for 'Monthly Projection'", () => {
    expect(getMetricIcon("Monthly Projection")).toBe(TrendingUp);
  });

  it("returns Target for 'Potential Savings'", () => {
    expect(getMetricIcon("Potential Savings")).toBe(Target);
  });

  it("returns AlertTriangle for 'Active Alerts'", () => {
    expect(getMetricIcon("Active Alerts")).toBe(AlertTriangle);
  });

  it("returns Database for 'Total Resources'", () => {
    expect(getMetricIcon("Total Resources")).toBe(Database);
  });

  it("returns Globe for 'Active Regions'", () => {
    expect(getMetricIcon("Active Regions")).toBe(Globe);
  });

  it("returns Users for 'AWS Accounts'", () => {
    expect(getMetricIcon("AWS Accounts")).toBe(Users);
  });

  it("returns Zap for 'Efficiency Score'", () => {
    expect(getMetricIcon("Efficiency Score")).toBe(Zap);
  });

  it("returns CircleDashedIcon for unknown metric", () => {
    expect(getMetricIcon("Unknown Metric")).toBe(CircleDashedIcon);
  });
});
