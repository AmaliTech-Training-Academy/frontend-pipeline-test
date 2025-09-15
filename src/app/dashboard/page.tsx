import React, { Suspense } from "react";
import { dashboardCards } from "./components/dashboard-cards";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { auth } from "../../../auth";
import DateFilter from "@/components/date-filter";
import { getCurrentDateString } from "@/utils/date-util";
import LogoShimmer from "@/components/loaders/logo-shimmer";
export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  const selectedDate = params.date || getCurrentDateString();

  return (
    <div className="p-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-5 gap-3 lg:gap-0">
        <div>
          <h1 className="text-2xl font-bold mb-1">Cost Overview Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive AWS cost management and analytics platform
          </p>
        </div>
        <div className="flex items-start gap-3">
          <DateFilter currentDate={selectedDate} />
          <Button className="text-white">
            <Download />
            Export Report
          </Button>
        </div>
      </div>
      <Suspense key={selectedDate} fallback={<LogoShimmer />}>
        {dashboardCards
          .filter(card => card.roles.includes(session?.user.role))
          .map(({ id, component: Card }) => (
            <Card key={id} date={selectedDate} />
          ))}
      </Suspense>
    </div>
  );
}
