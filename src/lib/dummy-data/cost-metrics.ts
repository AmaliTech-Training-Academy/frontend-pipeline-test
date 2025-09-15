import {
  DollarSign,
  TrendingUp,
  Target,
  AlertTriangle,
  Database,
  Globe,
  Users,
  Zap,
} from "lucide-react";
import { ResourceData } from "../types/resorce-utilization";
import { RegionCostData } from "../types/region-cost";

export const metricsData = [
  {
    icon: DollarSign,
    title: "Total Spend",
    value: "$1,637,425.9",
    trend: { value: "+2%", isPositive: true },
  },
  {
    icon: TrendingUp,
    title: "Monthly Projection",
    value: "$272,904.317",
    trend: { value: "-5%", isPositive: false },
  },
  {
    icon: Target,
    title: "Potential Savings",
    value: "$14,840",
    trend: { value: "+3%", isPositive: true },
  },
  {
    icon: AlertTriangle,
    title: "Active Alerts",
    value: "6",
    trend: { value: "+2%", isPositive: true },
  },
  {
    icon: Database,
    title: "Total Resources",
    value: "31,596",
    trend: { value: "+2%", isPositive: true },
  },
  {
    icon: Globe,
    title: "Active Regions",
    value: "10",
    trend: { value: "+3%", isPositive: true },
  },
  {
    icon: Users,
    title: "AWS Accounts",
    value: "8",
    trend: { value: "+2%", isPositive: true },
  },
  {
    icon: Zap,
    title: "Efficiency Score",
    value: "78%",
    trend: { value: "-3%", isPositive: false },
  },
];

export const resourceData: ResourceData[] = [
  { name: "EC2", cost: "$292,988.35", utilization: 100 },
  { name: "RDS", cost: "$155,263", utilization: 100 },
  { name: "Lambda", cost: "$29,186.62", utilization: 100 },
  { name: "DynamoDB", cost: "$64,092.8", utilization: 100 },
  { name: "ElastiCache", cost: "$102,817.41", utilization: 100 },
];

export const regionCostData: RegionCostData = {
  regions: [
    { region: "ap-south-1", totalCost: 135000 },
    { region: "ap-southeast-1", totalCost: 170000 },
    { region: "eu-central-1", totalCost: 75000 },
    { region: "sa-east-1", totalCost: 65000 },
    { region: "eu-west-1", totalCost: 110000 },
  ],
};
