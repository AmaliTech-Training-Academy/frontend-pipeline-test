import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";

const LoginNavbar = () => {
  return (
    <header className="flex items-center py-5 absolute left-0 right-0 justify-between px-5">
      <Link href={"/"} className="flex items-center gap-2">
        <div className="border p-1 rounded-lg hover:bg-muted-foreground/10 dark:bg-muted-foreground/10 dark:hover:bg-muted-foreground/14">
          <ArrowLeft />
        </div>
        <p>Back home</p>
      </Link>
      <ModeToggle />
    </header>
  );
};

export default LoginNavbar;
