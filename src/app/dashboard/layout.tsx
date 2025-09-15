import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { SearchForm } from "./components/search-form";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center justify-between py-3 px-5 border-b dark:bg-sidebar">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <SearchForm />
          </div>
          <div className="flex items-center gap-2">
            {/* Notification Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="font-medium">New message received</div>
                  <div className="text-sm text-muted-foreground">
                    You have a new message from John Doe
                  </div>
                  <div className="text-xs text-muted-foreground">
                    2 minutes ago
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="font-medium">Task completed</div>
                  <div className="text-sm text-muted-foreground">
                    Your report has been generated successfully
                  </div>
                  <div className="text-xs text-muted-foreground">
                    1 hour ago
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="font-medium">System update</div>
                  <div className="text-sm text-muted-foreground">
                    New features are now available
                  </div>
                  <div className="text-xs text-muted-foreground">
                    3 hours ago
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center justify-center">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />
          </div>
        </header>
        <main className="bg-background-neutral dark:bg-sidebar min-h-screen">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
