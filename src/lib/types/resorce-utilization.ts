import { ApiResponse } from "./response";

export interface ResourceData {
  name: string;
  cost: string;
  utilization: number;
}
export interface TopFiveResources {
  topFiveServicesReport: {
    grandTotal: number;
    services: {
      service: string;
      totalCost: number;
    }[];
  };
}
export interface ResorcesProps {
  response: ApiResponse<TopFiveResources>;
}
