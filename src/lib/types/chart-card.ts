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
  readonly title: string;
  readonly subTitle?: string;
  readonly isLoading: boolean;
  readonly hasError: boolean;
  readonly errorMessage?: string;
  readonly onRetry: () => void;
  readonly children: ReactNode; // The actual chart component
  readonly className?: string;
  readonly withTitle?: boolean;
  readonly contentClassName?: string;
  readonly isEmpty?: boolean;
  readonly emptyMessage?: string;
  readonly emptyIcon?: ReactNode;
}
