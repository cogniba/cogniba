import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Logo from "../svg/LogoIcon";
import LandingPageGitHubButton from "./LandingPageGitHubButton";
import { Button } from "../ui/button";

export default function LandingPageHeader() {
  return (
    <div className="flex w-full justify-center border-b bg-secondary/25 pb-16 shadow-md">
      <NavigationMenu className="fixed mx-auto flex h-16 w-full max-w-7xl justify-between px-6">
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

        <NavigationMenuList className="gap-2">
          <NavigationMenuItem className="mr-2">
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              asChild
            >
              <a
                href="https://github.com/Cogniba/Cogniba"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LandingPageGitHubButton />
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/sign-in">
                <Button variant="secondary">Sign In</Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem asChild>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
