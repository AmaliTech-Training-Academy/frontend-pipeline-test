import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ErrorBoundaryWithRefresh } from "../error-boundary-with-refetch";
import { Spinner } from "../loaders/Spinner";
import { EmptyState } from "../empty-state";
import { ChartCardProps, ChartWrapperProps } from "@/lib/types/chart-card";

export function ChartCard({
  title,
  subTitle,
  children,
  className = "",
  headerClassName = "",
  contentClassName = "",
  withTitle = true,
}: ChartCardProps) {
  return (
    <Card
      className={`w-full pb-0 gap-0 rounded-sm mb-6 overflow-hidden shadow-none ${className}`}
    >
      {withTitle && (
        <CardHeader className={`flex justify-between ${headerClassName}`}>
          {withTitle && <CardTitle>{title}</CardTitle>}
          {subTitle && (
            <span className="text-xs text-muted-foreground">{subTitle}</span>
          )}
        </CardHeader>
      )}
      <CardContent className={`p-0 pt-5 ${contentClassName}`}>
        {children}
      </CardContent>
    </Card>
  );
}

export function ChartWrapper({
  title,
  subTitle,
  isLoading,
  hasError,
  errorMessage,
  onRetry,
  children,
  className,
  withTitle,
  contentClassName,
  isEmpty,
  emptyMessage,
  emptyIcon,
}: ChartWrapperProps) {
  if (isLoading) {
    return (
      <ChartCard
        withTitle={withTitle}
        title={title}
        subTitle={subTitle}
        className={className}
      >
        <Spinner />
      </ChartCard>
    );
  }

  if (hasError) {
    return (
      <ChartCard
        withTitle={withTitle}
        title={title}
        subTitle={subTitle}
        className={className}
      >
        <ErrorBoundaryWithRefresh
          onRetry={onRetry}
          error={errorMessage || "Failed to load data"}
        />
      </ChartCard>
    );
  }

  if (isEmpty) {
    return (
      <ChartCard
        withTitle={withTitle}
        title={title}
        subTitle={subTitle}
        className={className}
      >
        <EmptyState
          message={emptyMessage || "No data recorded for this period"}
          icon={emptyIcon}
        />
      </ChartCard>
    );
  }

  return (
    <ChartCard
      withTitle={withTitle}
      title={title}
      subTitle={subTitle}
      className={className}
      contentClassName={contentClassName}
    >
      {children}
    </ChartCard>
  );
}
