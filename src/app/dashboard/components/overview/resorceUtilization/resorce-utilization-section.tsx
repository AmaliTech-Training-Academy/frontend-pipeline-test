import { fetchResources } from "@/lib/services/server/cost-metrics";
import { ResourceUtilization } from "./resorce-utilization";
import { SectionProps } from "@/lib/types";

export default async function ResourceUtilizationSection({
  date,
}: SectionProps) {
  const response = await fetchResources(date);
  return <ResourceUtilization response={response} />;
}
