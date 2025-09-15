import { CostTrendPoint } from "@/lib/types/daily-cost-trend";
import { apiFetch } from "@/utils/fetch-helper";
export async function fetchCostTrend(days: number = 7) {
  return await apiFetch<CostTrendPoint>(`/costs/cost-trend?days=${days}`);
}
