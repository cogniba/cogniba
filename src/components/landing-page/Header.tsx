import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import GitHubButton from "./GitHubButton";
import { Button } from "../ui/button";
import CognibaLogo from "../CognibaLogo";
import MobileSidebar from "./MobileSidebar";

export default function Header() {
  return (
    <div className="pb-16">
      <div className="fixed z-40 h-16 w-full bg-background/80"></div>
      <div className="fixed z-50 flex h-16 w-full justify-center border-b bg-secondary/25 shadow-md backdrop-blur">
        <div className="fixed flex h-16 w-full items-center justify-between px-6 lg:hidden">
          <CognibaLogo className="z-50" />
          <MobileSidebar />
        </div>
        <NavigationMenu className="invisible fixed mx-auto flex h-16 w-full max-w-7xl justify-between px-6 lg:visible">
          <NavigationMenuList>
            <NavigationMenuItem className="mr-9">
              <CognibaLogo />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/research" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Research
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/faq" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  FAQs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/pricing" legacyBehavior passHref>
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
                  <GitHubButton />
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
    </div>
  );
}
