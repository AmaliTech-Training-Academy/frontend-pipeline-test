import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavUser } from "@/app/dashboard/components/nav-user";
import { RolesEmun } from "@/lib/enums/roles";

vi.mock("@/components/ui/sidebar", () => ({
  SidebarMenu: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SidebarMenuButton: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
  SidebarMenuItem: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useSidebar: () => ({ isMobile: false }),
}));

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://example.com/avatar.jpg",
  role: RolesEmun.FinanceManager,
};

describe("NavUser", () => {
  it("renders user name and email", () => {
    render(<NavUser user={mockUser} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText(RolesEmun.FinanceManager)).toBeInTheDocument();
  });
});
