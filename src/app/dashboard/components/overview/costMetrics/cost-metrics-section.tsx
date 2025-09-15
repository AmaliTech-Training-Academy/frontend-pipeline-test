import { fetchCostMetrics } from "@/lib/services/server/cost-metrics";
import CostMetrics from "./cost-metrics";
import { SectionProps } from "@/lib/types";

export default async function CostMetricsSection({ date }: SectionProps) {
  const response = await fetchCostMetrics({ date });
  return <CostMetrics response={response} />;
}
