"use client";
import { Button } from "@/components/ui/button";
import { CostAnomaly } from "@/lib/types/cost-anomalies";

export default function AnomalyActions({ anomaly }: { anomaly: CostAnomaly }) {
  async function handleInvestigate(id: string) {
    // Implementation
    return id;
  }
  return (
    <div>
      <Button
        className="text-primary hover:bg-transparent hover:text-primary/80 cursor-pointer"
        variant="ghost"
        size="sm"
        onClick={() => handleInvestigate(anomaly.id)}
      >
        Investigate
      </Button>
    </div>
  );
}
