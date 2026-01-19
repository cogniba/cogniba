import type { LucideIcon } from "lucide-react";
import {
  BookOpenIcon,
  CreditCardIcon,
  HelpCircleIcon,
  NewspaperIcon,
} from "lucide-react";

type NavigationItemType = {
  name: string;
  href: string;
  Icon: LucideIcon;
};

const navigationConfig = {
  navigationItems: [
    { name: "Research", href: "/research", Icon: BookOpenIcon },
    { name: "FAQs", href: "/faq", Icon: HelpCircleIcon },
    { name: "Blog", href: "/blog", Icon: NewspaperIcon },
    { name: "Pricing", href: "/pricing", Icon: CreditCardIcon },
  ] satisfies NavigationItemType[],
} as const;

export default navigationConfig;
