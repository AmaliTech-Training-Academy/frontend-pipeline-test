import {
  Home,
  BarChartIcon as ChartColumn,
  Brain,
  Settings,
  TriangleAlert,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import { ProtectedRoute } from "@/lib/types/user";

export const protectedRoutes: ProtectedRoute[] = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Home,
    role: [],
  },
  {
    title: "Cost Analytics",
    url: "/cost-analytics",
    icon: ChartColumn,
    role: [],
  },
  {
    title: "AI Forecasting",
    url: "/ai-forecasting",
    icon: Brain,
    role: [],
  },
  {
    title: "Anomaly Detection",
    url: "/anomaly-detection",
    icon: TriangleAlert,
    role: [],
  },
  {
    title: "Tag Compliance",
    url: "/tag-compliance",
    icon: Shield,
    role: [],
  },
  {
    title: "Optimization",
    url: "/optimization",
    icon: Zap,
    role: [],
  },
  {
    title: "API & Integration",
    url: "/api-integration",
    icon: Globe,
    role: [],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    role: [],
  },
];

export const publicPaths = [
  "/",
  "/login",
  "/register",
  "/unauthorized",
  "/bootstrap",
];
