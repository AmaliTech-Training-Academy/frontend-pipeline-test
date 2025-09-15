import { ChartColumn } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = ({ href, className }: { href: string; className?: string }) => {
  return (
    <Link href={href} className={`flex items-center gap-2 ${className}`}>
      <div className="border p-1 rounded bg-primary">
        <ChartColumn className="text-white" />
      </div>
      <h2 className="font-semibold text-primary">CloudInsight Pro</h2>
    </Link>
  );
};

export default Logo;
