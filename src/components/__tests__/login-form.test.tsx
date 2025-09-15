import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import LoginForm from "@/components/login-form";
import { SuccessTypes } from "@/lib/types/response";

const mockPush = vi.fn();
const mockLocationHref = vi.fn();
Object.defineProperty(window, "location", {
  value: {
    href: mockLocationHref,
  },
  writable: true,
});

Object.defineProperty(window.location, "href", {
  set: mockLocationHref,
  get: () => "http://localhost:3000",
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockSsoAuthenticate = vi.fn();
vi.mock("@/lib/services/server/sso-authenticate", () => ({
  ssoAuthenticate: (email: string) => mockSsoAuthenticate(email),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    mockPush.mockReset();
    mockLocationHref.mockReset();
    mockSsoAuthenticate.mockReset();
    vi.clearAllMocks();
  });

  it("renders heading and input", () => {
    render(<LoginForm />);
    expect(
      screen.getByRole("heading", { name: /create your cloudinsight account/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue with sso/i })
    ).toBeInTheDocument();
  });

  it("does not submit with invalid email", async () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email address/i);
    const submitButton = screen.getByRole("button", {
      name: /continue with sso/i,
    });

    fireEvent.change(emailInput, { target: { value: "not-an-email" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSsoAuthenticate).not.toHaveBeenCalled();
    });
  });

  it("submits and navigates on successful response with authorizationEndpoint", async () => {
    mockSsoAuthenticate.mockResolvedValue({
      status: SuccessTypes.Success,
      message: "SSO initiated",
      data: { authorizationEndpoint: "https://example.com/auth" },
    });
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    const submitButton = screen.getByRole("button", {
      name: /continue with sso/i,
    });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSsoAuthenticate).toHaveBeenCalledWith("user@example.com");
      expect(mockLocationHref).toHaveBeenCalledWith("https://example.com/auth");
    });
  });

  it("shows success message when no external URL provided", async () => {
    mockSsoAuthenticate.mockResolvedValue({
      success: true,
      message: "SSO initiated",
      data: {},
    });
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    const submitButton = screen.getByRole("button", {
      name: /continue with sso/i,
    });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSsoAuthenticate).toHaveBeenCalledWith("user@example.com");
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it("shows loading state while authenticating", async () => {
    let resolveAuth: (value: unknown) => void = () => {};
    const pending = new Promise(resolve => {
      resolveAuth = resolve;
    });
    mockSsoAuthenticate.mockReturnValue(
      pending as unknown as Promise<{
        status: SuccessTypes.Success | SuccessTypes.Fail;
        message: string;
        data: any;
      }>
    );

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    const submitButton = screen.getByRole("button", {
      name: /continue with sso/i,
    });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/authenticating/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    resolveAuth({
      status: SuccessTypes.Success,
      message: "SSO initiated",
      data: { authorizationEndpoint: "https://example.com/auth" },
    });
    await waitFor(() => {
      expect(screen.queryByText(/authenticating/i)).not.toBeInTheDocument();
    });
  });

  it("shows error message on network error", async () => {
    mockSsoAuthenticate.mockRejectedValue(new Error("Network error"));

    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email address/i);
    const submitButton = screen.getByRole("button", {
      name: /continue with sso/i,
    });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSsoAuthenticate).toHaveBeenCalledWith("user@example.com");
      expect(screen.getByText("Network error")).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
