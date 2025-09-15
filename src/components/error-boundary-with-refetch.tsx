"use client";

// import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryWithRefreshProps {
  error: string;
  onRetry?: () => void;
}

export function ErrorBoundaryWithRefresh({
  error,
  onRetry,
}: ErrorBoundaryWithRefreshProps) {
  // const router = useRouter();

  const handleRefresh = () => {
    if (onRetry) {
      onRetry();
    }
    //  else {
    //   router.refresh();
    // }
  };

  return (
    <div data-testid="error-boundary" className="flex flex-col items-center justify-center p-8 text-center space-y-2">
      <div>
        <h3 data-testid="error-title" className="text-sm font-semibold">Failed to load data</h3>
        <p className="text-xs text-muted-foreground">{error}</p>
      </div>
      <Button
        onClick={handleRefresh}
        variant="outline"
        size={"sm"}
        className="bg-transparent text-xs"
        data-testid="retry-button"
      >
        Try Again
      </Button>
    </div>
  );
}
