import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    description: "Great for beginners exploring Cogniba.",
    buttonText: "Start for Free",
    price: 0,
    features: ["20 games per day", "30-day analytics history"],
  },
  {
    name: "Pro",
    description: "For serious users aiming for top results.",
    buttonText: "Get Started",
    price: 20,
    features: ["Unlimited games", "Unlimited analytics history"],
  },
];

export default function PricingPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-12 pb-[5%]">
      <div className="grid gap-2 text-center">
        <h1 className="text-5xl font-semibold">Choose Your Plan</h1>
        <p className="text-lg text-foreground/80">
          Start for free or go unlimited for the best results!
        </p>
      </div>
      <div className="mx-auto flex items-center gap-4">
        {pricingPlans.map((plan, index) => (
          <div key={index} className="rounded-lg border px-6 py-6">
            <h2 className="pb-0.5 text-2xl font-semibold">{plan.name}</h2>
            <p className="pb-8 text-foreground/90">{plan.description}</p>
            <p className="flex items-end gap-1 pb-8 font-light">
              <span className="text-5xl font-medium">${plan.price}</span>
              <span className="text-foreground/80">/ month</span>
            </p>
            <Button className="w-full">{plan.buttonText}</Button>
            <hr className="my-8" />
            <div className="mb-2 grid gap-1.5">
              {plan.features.map((feature, index) => (
                <p key={index} className="flex gap-2">
                  <CheckIcon className="text-primary" />
                  <span>{feature}</span>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
