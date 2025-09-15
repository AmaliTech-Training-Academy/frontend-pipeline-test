import { LucideIcon } from "lucide-react";
import { RolesEmun } from "../enums/roles";

export interface DashboardProps {
  date: string;
}

export interface CardConfig {
  id: string;
  component: React.ComponentType<DashboardProps>;
  roles: RolesEmun[]; // who can see this card
}

export interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  trend: {
    value: string;
    positive: boolean;
  };
  className?: string;
}
export interface CostMetric {
  metrics: {
    title: string;
    value: string;
    trend: {
      value: string;
      positive: boolean;
    };
  }[];
}
