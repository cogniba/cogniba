export type PlanType = {
  priceId: string;
  price: number;
  isFreePlan?: boolean;
  name: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

const isDevelopment = process.env.NODE_ENV === "development";

const stripeConfig = {
  plans: [
    {
      priceId: "",
      price: 0,
      isFreePlan: true,
      name: "Free",
      description: "Great for beginners exploring Cogniba.",
      features: ["10 games per day", "30-day analytics history"] as const,
    },
    {
      priceId: isDevelopment
        ? "price_1Qnd87RprLy2N53jYmRQE4DC"
        : "price_1QndAKRprLy2N53jEjWArTKJ",
      price: 20,
      name: "Pro",
      description: "For serious users aiming for top results.",
      features: ["Unlimited games", "Unlimited analytics history"] as const,
      highlighted: true,
    },
  ] satisfies PlanType[],
} as const;

export default stripeConfig;
