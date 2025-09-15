import { render, screen } from "@testing-library/react";
import LoginPage from "@/app/(auth)/login/page";

vi.mock("@/components/login-form", () => ({
  __esModule: true,
  default: () => <div data-testid="login-form">Login Form</div>,
}));

describe("LoginPage", () => {
  it("renders the LoginForm component", () => {
    render(<LoginPage />);
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });
});
