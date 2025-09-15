import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BarChartProps {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  data: any[];
  xAxisKey: string;
  yAxisKey: string;
  height?: number;
  barColor?: string;
  className?: string;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number, name: string) => [string, string];
  yAxisDomain?: [number, number] | [number, string] | [string, number];
}

export function CustomBarChart({
  data,
  xAxisKey,
  yAxisKey,
  height = 400,
  barColor = "var(--color-bar-chat)",
  className = "",
  yAxisFormatter,
  tooltipFormatter,
  yAxisDomain,
}: BarChartProps) {
  return (
    <ChartContainer
      config={{}}
      className={`h-[${height}px] w-full ${className}`}
    >
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
          dataKey={xAxisKey}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          domain={yAxisDomain}
          tickFormatter={yAxisFormatter}
        />
        <ChartTooltip
          content={<ChartTooltipContent />}
          formatter={tooltipFormatter}
        />
        <Bar dataKey={yAxisKey} fill={barColor} radius={[2, 2, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
