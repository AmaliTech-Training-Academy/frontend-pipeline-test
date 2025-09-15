import { fetchRegionCost } from "@/lib/services/server/cost-metrics";
import { CostByRegion } from "./region-cost";
import { SectionProps } from "@/lib/types";

export default async function RegionCostSection({ date }: SectionProps) {
  const response = await fetchRegionCost(date);
  return <CostByRegion response={response} />;
}
