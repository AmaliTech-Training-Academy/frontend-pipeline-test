import { CostByEnvironmentData } from "./cost-by-environment";
import { CostTrendPoint } from "./daily-cost-trend";
import { ApiResponse } from "./response";

export interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

export interface ReusableAreaChartProps<T> {
  data: T[];
  xKey: keyof T;
  yKey: keyof T;
  height?: number;
  color?: string;
  label?: string;
  subLabel?: string;
}

export interface CostByEnvironmentProps {
  response: ApiResponse<CostByEnvironmentData>;
}

export interface CostTrendAreaChartProps {
  response: ApiResponse<CostTrendPoint>;
}

export interface LoginFormInput {
  email: string;
}
export type PercentageFn = (
  part: number,
  total: number,
  decimals?: number
) => number;

export interface DateFilterProps {
  currentDate: string;
}
export interface SectionProps {
  date: string;
}

export interface DateOptional {
  date?: string;
}
