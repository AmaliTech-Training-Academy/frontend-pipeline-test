import { CostAnomaly } from "@/lib/types/cost-anomalies";
import { CostMetric } from "@/lib/types/cost-metrics";
import { RegionCostData } from "@/lib/types/region-cost";
import { TopFiveResources } from "@/lib/types/resorce-utilization";
import { PaginatedList } from "@/lib/types/response";
import { getCurrentDateString } from "@/utils/date-util";
import { apiFetch } from "@/utils/fetch-helper";
import { SectionProps } from "@/lib/types";

export async function fetchCostMetrics({ date }: SectionProps) {
  return await apiFetch<CostMetric>(
    `/costs/summary-metrics?asOfDate=${date || getCurrentDateString()}`
  );
}
export async function fetchRegionCost(date?: string) {
  return await apiFetch<RegionCostData>(
    `/costs/daily-region-costs?date=${date || getCurrentDateString()}`
  );
}
export async function fetchResources(date?: string) {
  return await apiFetch<TopFiveResources>(
    `/costs/top-services?date=${date || getCurrentDateString()}`
  );
}
export async function fetchCostAnomalies() {
  return await apiFetch<PaginatedList<CostAnomaly>>("/costs/anomalies");
}
