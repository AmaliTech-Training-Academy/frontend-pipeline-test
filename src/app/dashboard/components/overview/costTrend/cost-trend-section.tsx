import { fetchCostTrend } from "@/lib/services/server/daily-cost-trend";
import { CostTrendAreaChart } from "./cost-trend-area-chart";

export default async function CostTrendSection() {
  const response = await fetchCostTrend();
  return <CostTrendAreaChart response={response} />;
}
