import Link from "next/link";
import { ChartColumn } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] dark:bg-background border-t text-white">
      <div className="w-full px-5 md:px-16 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8 text-sm text-center md:text-left">
          {/* Brand and blurb */}
          <div className="space-y-3 mx-auto md:mx-0">
            <Link
              href="/"
              className={`flex items-center gap-2 justify-center md:justify-start`}
            >
              <div className="border p-1 rounded bg-primary">
                <ChartColumn className="text-white" />
              </div>
              <h2 className="font-semibold text-primary">CloudInsight Pro</h2>
            </Link>
            <p className="text-xs  leading-relaxed max-w-xs mx-auto md:mx-0">
              The most advanced AWS cost management platform for modern
              businesses.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <h3 className="font-semibold">Product</h3>
            <ul className="space-y-2 text-white/90">
              <li>
                <Link
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#api"
                  className="hover:text-white transition-colors"
                >
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-white/90">
              <li>
                <Link
                  href="#docs"
                  className="hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#help"
                  className="hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2 text-white/90">
              <li>
                <Link
                  href="#about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#blog"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#careers"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-white/90">
          © {new Date().getFullYear()} CloudInsight Pro. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
