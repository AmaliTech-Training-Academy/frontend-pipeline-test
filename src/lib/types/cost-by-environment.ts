export interface CostByEnvironmentData {
  date: string;
  environments: {
    environment: string;
    totalCost: number;
    percentage: number;
  }[];
}
