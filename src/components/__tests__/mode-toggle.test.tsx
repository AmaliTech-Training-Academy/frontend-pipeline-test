import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { ModeToggle } from "@/components/mode-toggle";

vi.mock("next-themes", () => ({
  useTheme: () => ({
    setTheme: vi.fn(),
  }),
}));

describe("ModeToggle", () => {
  it("renders the toggle button", () => {
    render(<ModeToggle />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });
});
