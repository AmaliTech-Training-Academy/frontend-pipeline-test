import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface MetricCardSkeletonProps {
  className?: string;
}

export function MetricCardSkeleton({ className }: MetricCardSkeletonProps) {
  return (
    <Card className={cn("p-6", className)}>
      <CardContent className="p-0 space-y-4">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-accent rounded-lg">
            <Skeleton className="h-5 w-5" />
          </div>
        </div>

        <div className="space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-20" />
        </div>

        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

export function CostMetricsSkeleton() {
  return (
    <div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <MetricCardSkeleton key={index} className="shadow-none" />
          ))}
        </div>
      </div>
    </div>
  );
}
