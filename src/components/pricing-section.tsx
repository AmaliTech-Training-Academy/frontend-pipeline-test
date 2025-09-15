import { CircleCheck } from "lucide-react";
import { pricingPlans } from "@/utils/constants/pricing-plans";
export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 bg-[#f9fafb] dark:bg-muted/40">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="md:text-6xl text-3xl font-bold mb-2">
          Simple, Transparent Pricing
        </h2>
        <p className="text-muted-foreground mb-12">
          Choose the plan that fits your organization
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map(plan => (
            <div key={plan.name} className={plan.wrapperStyle}>
              <div className={plan.cardStyle}>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {plan.badge && (
                    <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-4xl font-bold">
                  {plan.price}
                  <span className="text-base font-normal text-muted-foreground">
                    {plan.period}
                  </span>
                </p>

                <p className="text-muted-foreground mt-2 mb-6">
                  {plan.description}
                </p>

                <ul className="space-y-3 text-muted-foreground flex-1">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-center gap-1">
                      <CircleCheck className="h-5 w-5 text-primary" />
                      <p>{feature}</p>
                    </li>
                  ))}
                </ul>

                <button className={plan.buttonStyle}>{plan.buttonText}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
