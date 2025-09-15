export const ENVIRONMENT_COLORS: Record<string, string> = {
  development: "#2563eb",
  testing: "#8b5cf6",
  production: "#60a5fa",
  demo: "#fbbf24",
  staging: "#22c55e",
  qa: "#f97316",
};

export const ENVIRONMENT_COLOR_ORDER = [
  "#2563eb",
  "#8b5cf6",
  "#60a5fa",
  "#fbbf24",
  "#22c55e",
  "#f97316",
];

export const impactColors = {
  Low: "bg-success/10 text-success/80 dark:bg-success/90 dark:text-white",
  Medium: "bg-chart-4/10 text-chart-4/80 dark:bg-chart-4/90 dark:text-white",
  High: "bg-destructive/10 text-destructive/80 dark:bg-destructive/90 dark:text-white",
};

export const statusColors = {
  Resolved: "bg-success/10 text-success/80 dark:bg-success/90 dark:text-white",
  Acknowledged:
    "bg-primary/10 text-primary/80 dark:bg-primary/90 dark:text-white",
  Monitoring:
    "bg-muted/10 text-muted-foreground/80 dark:bg-muted/90 dark:text-white",
  Investigating:
    "bg-chart-4/10 text-chart-4/80 dark:bg-chart-4/90 dark:text-white",
};
