import { CostByEnvironmentData } from "@/lib/types/cost-by-environment";
import { apiFetch } from "@/utils/fetch-helper";

export async function fetchCostByEnvironment(date?: string) {
  const currentDate = new Date().toISOString().split("T")[0];
  return await apiFetch<CostByEnvironmentData>(
    `/costs/daily-environment-costs?date=${date || currentDate}`
  );
}
