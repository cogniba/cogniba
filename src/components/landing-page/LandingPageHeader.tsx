import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Logo from "../svg/Logo";
import LandingPageGitHubButton from "./LandingPageGitHubButton";

export default function LandingPageHeader() {
  return (
    <div className="flex w-full justify-center border-b bg-secondary/50 pb-16 shadow-md">
      <NavigationMenu className="fixed mx-auto flex h-16 w-full max-w-7xl justify-between">
        <NavigationMenuList>
          <NavigationMenuItem className="mr-9 text-xl font-bold">
            <Link href="/" className="flex items-center justify-center gap-2.5">
              <Logo className="text-2xl" />
              <span className="text-primary">Cogniba</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="#features" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Features
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="#how-it-works" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                How it works
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="#pricing" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Pricing
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList>
          <NavigationMenuItem>
            <a
              href="https://github.com/Cogniba/Cogniba"
              target="_blank"
              rel="noopener noreferrer"
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <LandingPageGitHubButton />
              </NavigationMenuLink>
            </a>
          </NavigationMenuItem>
          <NavigationMenuItem>Sign in</NavigationMenuItem>
          <NavigationMenuItem>Sign up</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
