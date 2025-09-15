"use client";
import { fetchUserData } from "@/lib/services/server/user-data";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";

export default function AuthChecker() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl");

  const checkAuth = async () => {
    try {
      const response = await fetchUserData();
      if (!response.success) {
        window.location.href = `${process.env.NEXT_PUBLIC_AUTHENTICATION_URL}`;
      } else {
        setIsLoading(false);
        router.replace(callbackUrl || "/");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(new Error(String(err)).message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [session, status, callbackUrl]);

  if (error && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <p className="text-red-600">Failed to load data: {error}</p>
        <Button onClick={checkAuth} disabled={isLoading}>
          {isLoading ? "Retrying..." : "Try Again"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen animate-pulse pointer-events-none">
      <Logo href="/" />
    </div>
  );
}
