import { fetchCostByEnvironment } from "@/lib/services/server/cost-by-environment";
import CostByEnvironment from "./cost-by-environment";
import { SectionProps } from "@/lib/types";

export default async function CostByEnvironmentSection({ date }: SectionProps) {
  const response = await fetchCostByEnvironment(date);
  return <CostByEnvironment response={response} />;
}
