import { ApiResponse, PaginatedList } from "./response";

export interface CostAnomaly {
  id: string;
  service: string;
  account: string;
  impact: "Low" | "Medium" | "High";
  change: string;
  cost: number;
  detected: string;
  status: "Resolved" | "Acknowledged" | "Monitoring" | "Investigating";
}

export interface CostAnomaliesResponse {
  response: ApiResponse<PaginatedList<CostAnomaly>>;
}

export interface CostAnomaliesParams {
  page?: number;
  size?: number;
}
