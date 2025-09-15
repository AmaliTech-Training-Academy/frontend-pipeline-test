import LoginNavbar from "@/components/login-navbar";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block relative min-h-screen">
        <Image
          src="/images/cloudimage.jpg"
          alt="Cloud illustration"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="relative">
        <LoginNavbar />
        <div className="flex min-h-screen items-center justify-center p-6">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </main>
  );
}
