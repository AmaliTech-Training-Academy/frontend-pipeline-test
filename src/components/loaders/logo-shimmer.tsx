import { ChartColumn } from "lucide-react";
import React from "react";

export default function LogoShimmer() {
  return (
    <div className="flex-grow flex items-center justify-center min-h-[calc(100vh-14rem)]">
      <div className="animate-pulse pointer-events-none bg-primary/50 text-white p-1 rounded-sm">
        <ChartColumn size={30} />
      </div>
    </div>
  );
}
