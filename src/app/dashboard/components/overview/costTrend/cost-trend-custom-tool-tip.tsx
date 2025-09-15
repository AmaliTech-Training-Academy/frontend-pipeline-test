import { TooltipProps } from "@/lib/types";
export const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background rounded shadow px-3 py-2 border text-xs">
        <div className="font-semibold">{label}</div>
        <div>
          <span className="text-primary font-bold">Cost: </span>$
          {payload[0].value.toLocaleString()}
        </div>
      </div>
    );
  }
  return null;
};
