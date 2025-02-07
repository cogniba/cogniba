import {
  BookOpenIcon,
  CreditCardIcon,
  HelpCircleIcon,
  LucideIcon,
  NewspaperIcon,
} from "lucide-react";

type NavigationItemType = {
  name: string;
  href: string;
  Icon: LucideIcon;
};

export const navigationItems = [
  { name: "Research", href: "/research", Icon: BookOpenIcon },
  { name: "FAQs", href: "/faq", Icon: HelpCircleIcon },
  { name: "Blog", href: "/blog", Icon: NewspaperIcon },
  { name: "Pricing", href: "/pricing", Icon: CreditCardIcon },
] satisfies NavigationItemType[];
