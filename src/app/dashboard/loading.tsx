import Logo from "@/components/logo/logo";
import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center min-h-screen">
      <Logo href="/" className="animate-pulse pointer-events-none" />
    </div>
  );
}
