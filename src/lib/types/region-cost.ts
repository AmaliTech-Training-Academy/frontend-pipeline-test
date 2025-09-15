import { ApiResponse } from "./response";

export interface RegionCostData {
  regions: {
    region: string;
    totalCost: number;
  }[];
}

export interface RegionCostChartProps {
  response: ApiResponse<RegionCostData>;
}
