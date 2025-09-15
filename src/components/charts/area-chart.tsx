"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { CustomTooltip } from "@/app/dashboard/components/overview/costTrend/cost-trend-custom-tool-tip";
import { ReusableAreaChartProps } from "@/lib/types/index";
import { Card } from "../ui/card";

export const ReusableAreaChart = <T extends object>({
  data,
  xKey,
  yKey,
  height = 300,
  color = "#1D4ED8",
}: ReusableAreaChartProps<T>) => {
  const gradientId = `color-${yKey.toString()}`;

  return (
    <Card data-testid="area-chart" className="border-none shadow-none pr-6">
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey={xKey as string} tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey={yKey as string}
            stroke={color}
            fill={`url(#${gradientId})`}
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};
