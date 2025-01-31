import AppLogo from "@/components/AppLogo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function DesktopHeader() {
  return (
    <div className="fixed top-0 z-50 h-16 w-full max-w-6xl px-4 pt-2">
      <NavigationMenu className="flex h-full w-full max-w-full items-center justify-between rounded-2xl border border-muted bg-blue-600 bg-muted/70 px-6 shadow-xl backdrop-blur">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <AppLogo />
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/research" legacyBehavior passHref>
              <NavigationMenuLink asChild>
                <Button variant="ghost">Research</Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/faq" legacyBehavior passHref>
              <NavigationMenuLink asChild>
                <Button variant="ghost">FAQ</Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/blog" legacyBehavior passHref>
              <NavigationMenuLink asChild>
                <Button variant="ghost">Blog</Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/pricing" legacyBehavior passHref>
              <NavigationMenuLink asChild>
                <Button variant="ghost">Pricing</Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className="gap-1">
          <NavigationMenuItem>
            <Link href="/sign-in" legacyBehavior passHref>
              <NavigationMenuLink asChild>
                <Button variant="secondary">Sign In</Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/sign-up" legacyBehavior passHref>
              <NavigationMenuLink asChild>
                <Button>Get Started</Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
