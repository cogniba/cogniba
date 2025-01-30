export type PlanType = {
  priceId: string;
  price: number;
  isFreePlan?: boolean;

  name: string;
  description: string;
  features: string[];

  highlighted?: boolean;
};

const stripeConfig = {
  plans: [
    {
      priceId: "",
      price: 0,
      isFreePlan: true,

      name: "Free",
      description: "Great for beginners exploring Cogniba.",
      features: ["10 games per day", "30-day analytics history"],
    },
    {
      priceId: "<PRICE_ID>",
      price: 20,

      name: "Pro",
      description: "For serious users aiming for top results.",
      features: ["Unlimited games", "Unlimited analytics history"],

      highlighted: true,
    },
  ] satisfies PlanType[],
};

export default stripeConfig;
