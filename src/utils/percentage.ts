import { PercentageFn } from "@/lib/types";

export const percentage: PercentageFn = (part, total, decimals = 1) => {
  return Number(((part / total) * 100).toFixed(decimals));
};
