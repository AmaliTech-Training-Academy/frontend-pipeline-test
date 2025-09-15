import { CardConfig } from "@/lib/types/cost-metrics";
import { RolesEmun } from "@/lib/enums/roles";
import RegionCostSection from "./overview/costByRegion/region-cost-section";
import CostMetricsSection from "./overview/costMetrics/cost-metrics-section";
import ResourceUtilizationSection from "./overview/resorceUtilization/resorce-utilization-section";
import CostTrendSection from "./overview/costTrend/cost-trend-section";
import CostByEnvironmentSection from "./overview/costByEnvironment/cost-by-enironment-section";

export const dashboardCards: CardConfig[] = [
  {
    id: "cost-metrics",
    component: CostMetricsSection,
    roles: [RolesEmun.CloudCostAnalyst],
  },
  {
    id: "cost-trend",
    component: CostTrendSection,
    roles: [RolesEmun.CloudCostAnalyst],
  },
  {
    id: "cost-by-environment",
    component: CostByEnvironmentSection,
    roles: [RolesEmun.CloudCostAnalyst, RolesEmun.FinanceManager],
  },
  {
    id: "cost-by-region",
    component: RegionCostSection,
    roles: [RolesEmun.CloudCostAnalyst],
  },
  {
    id: "resource-utilization",
    component: ResourceUtilizationSection,
    roles: [RolesEmun.FinanceManager],
  },
];
