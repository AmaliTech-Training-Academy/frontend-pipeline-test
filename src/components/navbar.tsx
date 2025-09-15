"use client";
import Link from "next/link";
import { ChartColumn, LogOut, LayoutDashboard } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleSignOut } from "@/lib/services/server/user-data";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  // Function to get user initials for avatar fallback
  const getUserInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <header className="py-3 md:px-16 px-5 z-50 bg-background shadow-sm dark:border-b sticky top-0">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <Link href={"/"} className={`flex items-center gap-2`}>
          <div className="border p-1 rounded bg-primary">
            <ChartColumn className="text-white" />
          </div>
          <h2 className="font-semibold text-primary hidden md:flex">
            CloudInsight Pro
          </h2>
        </Link>

        {/* Center: Nav links (all breakpoints) */}
        <nav className="flex items-center gap-4 text-xs md:gap-6 md:text-sm lg:text-base lg:gap-10 text-muted-foreground">
          <Link
            href="#features"
            className="hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#testimonials"
            className="hover:text-foreground transition-colors"
          >
            Reviews
          </Link>
        </nav>

        {/* Right: Auth section */}
        {!session ? (
          <>
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm text-primary hover:underline"
              >
                Sign In
              </Link>
              <Button asChild>
                <Link className="text-white" href="#get-started">
                  Get Started
                </Link>
              </Button>
              <ModeToggle />
            </div>
            <div className="flex md:hidden items-center gap-3">
              <Link
                href="/login"
                className="text-sm text-primary hover:underline"
              >
                Sign In
              </Link>
              <ModeToggle />
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full cursor-pointer"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session.user?.profilePicture || ""}
                        alt={session.user?.username}
                      />
                      <AvatarFallback>
                        {getUserInitials(
                          session.user?.username,
                          session.user?.email
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                  <div className="md:flex hidden flex-col">
                    <p className="text-sm font-medium leading-none">
                      {session.user?.username}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2 md:hidden">
                  <p className="text-sm font-medium leading-none">
                    {session.user?.username}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session.user?.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
