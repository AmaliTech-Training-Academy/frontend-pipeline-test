import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { MetricCardProps } from "@/lib/types/cost-metrics";

export function MetricCard({
  icon: Icon,
  title,
  value,
  trend,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn("p-6", className)}>
      <CardContent className="p-0 space-y-4">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-primary-light rounded-lg">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>

        <div className="space-y-1 text-dark-text dark:text-white/70">
          <p className="text-sm  font-medium">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-sm">
          <p
            className={cn(
              "font-medium flex items-center gap-1",
              trend.positive ? "text-success" : "text-destructive"
            )}
          >
            {trend.positive ? (
              <TrendingUp className="trending-up" size={16} />
            ) : (
              <TrendingDown className="trending-down" size={16} />
            )}
            <span> {trend.value}</span>
          </p>
          <span className="text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
