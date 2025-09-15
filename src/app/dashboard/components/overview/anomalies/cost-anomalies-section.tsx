import { fetchCostAnomalies } from "@/lib/services/server/cost-metrics";
import CostAnomalies from "./cost-anomalies";

export default async function CostAnomaliesSection() {
  const response = await fetchCostAnomalies();
  return <CostAnomalies response={response} />;
}
