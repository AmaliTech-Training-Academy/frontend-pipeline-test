"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Mail, AlertCircle } from "lucide-react";
import Logo from "@/components/logo/logo";
import { ssoAuthenticate } from "@/lib/services/server/sso-authenticate";
import { LoginFormInput } from "@/lib/types";
import { LoginFormInputSchema } from "@/utils/schemas";
import { SuccessTypes } from "@/lib/types/response";
import { toast } from "sonner";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(LoginFormInputSchema),
  });

  const onSubmit = async (data: LoginFormInput) => {
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await ssoAuthenticate(data.email);

      if (response.status === SuccessTypes.Success) {
        // Check if we have an authorization endpoint in the response
        const authEndpoint = response.data?.authorizationEndpoint;
        if (authEndpoint) {
          // For external URLs, use window.location.href
          window.location.href = authEndpoint;
        } else {
          // If no external URL provided, show success message
          toast.success("SSO authentication initiated successfully");
        }
      } else {
        // Handle error response
        const errorMessage =
          response.message || "Failed to initiate SSO. Please try again.";
        setError(errorMessage);
      }
    } catch (error) {
      // More specific error handling
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error instanceof Error) {
        if (error.message.includes("NEXT_PUBLIC_API_BASE_URL")) {
          errorMessage = "Configuration error. Please contact support.";
        } else if (error.message.includes("HTTP error")) {
          errorMessage = "Server error. Please try again later.";
        } else if (error.message.includes("fetch")) {
          errorMessage =
            "Network error. Please check your connection and try again.";
        } else {
          errorMessage = error.message;
        }
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="">
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center mb-6">
              <Logo href="/login" />
            </div>
            <h1 className="text-2xl font-semibold">
              Create your CloudInsight account
            </h1>
            <p className="text-xs text-muted-foreground">
              Verify your enterprise email...
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`w-full pl-4 pr-10 py-2 border rounded-lg ring-0 outline-none transition-colors ${
                    errors.email
                      ? "border-destructive"
                      : "border-muted-foreground"
                  }`}
                  placeholder="Enter your work email..."
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.email && (
                <div className="mt-2 flex items-center text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Error display */}
            {error && (
              <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center mt-6"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Authenticating...
                </>
              ) : (
                "Continue with SSO"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
