import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Column } from "@/lib/types/app-table";
import { CostAnomaly } from "@/lib/types/cost-anomalies";
import { impactColors, statusColors } from "@/utils/constants/colors";

export const costAnomalyColumns: Column<CostAnomaly>[] = [
  {
    key: "service",
    label: "Service",
    render: value => <div className="font-medium">{String(value)}</div>,
  },
  {
    key: "account",
    label: "Account",
    render: value => (
      <div className="text-muted-foreground">{String(value)}</div>
    ),
  },
  {
    key: "impact",
    label: "Impact",
    render: value => {
      const impact = value as keyof typeof impactColors;
      return <Badge className={impactColors[impact]}>{impact}</Badge>;
    },
  },
  {
    key: "change",
    label: "Change",
    render: value => (
      <div className="text-red-600 font-medium">{String(value)}</div>
    ),
  },
  {
    key: "cost",
    label: "Cost",
    align: "right",
    render: value => {
      const cost = Number(value);
      return (
        <div className="text-muted-foreground">${cost.toLocaleString()}</div>
      );
    },
  },
  {
    key: "detected",
    label: "Detected",
    render: value => (
      <div className="text-muted-foreground text-sm">{String(value)}</div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: value => {
      const status = value as keyof typeof statusColors;
      return <Badge className={statusColors[status]}>{status}</Badge>;
    },
  },
];

export const renderCostAnomalyActions = () => (
  <Button variant="link" className="h-auto p-0 text-primary">
    Investigate
  </Button>
);
