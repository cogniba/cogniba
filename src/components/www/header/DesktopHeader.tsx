import AppLogo from "@/components/AppLogo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import navigationConfig from "@/config/landing-page/navigationConfig";
import Link from "next/link";

export default function DesktopHeader() {
  const { navigationItems } = navigationConfig;

  return (
    <div className="fixed top-0 z-50 h-16 w-full max-w-6xl px-4 pt-2">
      <NavigationMenu className="flex h-full w-full max-w-full items-center justify-between rounded-2xl border border-muted bg-muted/70 px-6 shadow-xl backdrop-blur">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/">
              <AppLogo />
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList>
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.name}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink asChild>
                  <Button variant="ghost">{item.name}</Button>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
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
