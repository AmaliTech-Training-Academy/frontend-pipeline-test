import {
  DollarSign,
  TrendingUp,
  Target,
  AlertTriangle,
  Database,
  Globe,
  Users,
  Zap,
  CircleDashedIcon,
} from "lucide-react";

export function getMetricIcon(title: string) {
  switch (title) {
    case "Total Spend":
      return DollarSign;
    case "Monthly Projection":
      return TrendingUp;
    case "Potential Savings":
      return Target;
    case "Active Alerts":
      return AlertTriangle;
    case "Total Resources":
      return Database;
    case "Active Regions":
      return Globe;
    case "AWS Accounts":
      return Users;
    case "Efficiency Score":
      return Zap;
    default:
      return CircleDashedIcon; // default icon for unknown metrics
  }
}
