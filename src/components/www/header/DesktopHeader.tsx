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
      <NavigationMenu className="border-muted bg-muted/70 flex h-full w-full max-w-full items-center justify-between rounded-2xl border px-6 shadow-xl backdrop-blur">
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
              <NavigationMenuLink asChild>
                <Link href={item.href}>
                  <Button variant="ghost">{item.name}</Button>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>

        <NavigationMenuList className="gap-1">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/sign-in">
                <Button variant="secondary">Sign In</Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
