import { ReactNode } from "react";

export interface ChartCardProps {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  withTitle?: boolean;
}

export interface ChartWrapperProps {
  title: string;
  subTitle?: string;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
  onRetry: () => void;
  children: ReactNode; // The actual chart component
  className?: string;
  withTitle?: boolean;
  contentClassName?: string;
  isEmpty?: boolean;
  emptyMessage?: string;
  emptyIcon?: ReactNode;
}
