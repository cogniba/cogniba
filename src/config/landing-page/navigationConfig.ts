import {
  LucideIcon,
  BookOpenIcon,
  CreditCardIcon,
  HelpCircleIcon,
  NewspaperIcon,
} from "lucide-react";

type NavigationItemType = {
  readonly name: string;
  readonly href: string;
  Icon: LucideIcon;
};

interface NavigationItems {
  readonly navigationItems: ReadonlyArray<NavigationItemType>;
}

const navigationConfig: NavigationItems = {
  navigationItems: [
    { name: "Research", href: "/research", Icon: BookOpenIcon },
    { name: "FAQs", href: "/faq", Icon: HelpCircleIcon },
    { name: "Blog", href: "/blog", Icon: NewspaperIcon },
    { name: "Pricing", href: "/pricing", Icon: CreditCardIcon },
  ],
};

export default navigationConfig;
