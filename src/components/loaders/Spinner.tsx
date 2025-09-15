import { Loader } from "lucide-react";

export function Spinner({ className = "" }: { className?: string }) {
  return (
    <Loader
      size={24}
      strokeWidth={1.5}
      className={`animate-spin mx-auto h-36 ${className}`}
      data-testid="spinner"
    />
  );
}
