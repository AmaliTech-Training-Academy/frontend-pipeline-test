export const pricingPlans = [
  {
    name: "Starter",
    price: "$49",
    period: "/per month",
    description:
      "Perfect for small teams getting started with cloud cost management",
    features: [
      "Up to 5 AWS Accounts",
      "Basic Cost Analytics",
      "Email Alerts",
      "Standard Support",
      "7-day Data Retention",
    ],
    buttonText: "Start Free Trial",
    buttonStyle:
      "mt-6 border border-primary text-primary font-medium rounded-lg py-3 hover:bg-primary duration-150 hover:text-white cursor-pointer",
    wrapperStyle: "md:pt-7",
    cardStyle:
      "rounded-xl shadow p-8 text-left flex flex-col pb-24 bg-[#f5f5f5] dark:bg-muted/50",
  },
  {
    name: "Professional",
    price: "$149",
    period: "/per month",
    description: "Advanced features for growing businesses",
    features: [
      "Up to 25 AWS Accounts",
      "AI-Powered Forecasting",
      "Anomaly Detection",
      "Tag Compliance Monitoring",
      "Custom Dashboards",
      "Priority Support",
      "90-day Data Retention",
    ],
    buttonText: "Start Free Trial",
    buttonStyle:
      "mt-6 bg-primary text-white font-medium rounded-lg py-3 hover:bg-primary/90 cursor-pointer",
    wrapperStyle: "",
    cardStyle:
      "bg-primary/5 rounded-xl shadow-lg border border-primary md:pb-32 p-8 text-left flex flex-col relative",
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "$449",
    period: "/per month",
    description: "Complete solution for large organization",
    features: [
      "Unlimited AWS Accounts",
      "Advanced ML Analytics",
      "Custom Integrations",
      "White-label Options",
      "Dedicated Support",
      "SSO Integration",
      "Unlimited Data Retention",
      "API Access",
    ],
    buttonText: "Contact Sales",
    buttonStyle:
      "mt-6 border border-primary text-primary font-medium rounded-lg py-3 hover:bg-primary hover:text-white duration-150 cursor-pointer",
    wrapperStyle: "md:pt-7",
    cardStyle:
      "rounded-xl shadow p-8 text-left flex flex-col bg-[#f5f5f5] dark:bg-muted/50",
  },
];
