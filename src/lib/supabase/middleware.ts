import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const siteUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SITE_URL
      : "http://localhost:3000";
  const isAuthenticated = user !== null;

  const { pathname, hostname } = request.nextUrl;
  const isAppSubdomain = hostname === "app.cogniba.com";
  const extendedPathname = isAppSubdomain
    ? `/app${pathname !== "/" ? pathname : ""}`
    : pathname;

  console.log(isAppSubdomain, pathname, extendedPathname);
  console.log(isAuthenticated, user);

  if (!isAuthenticated) {
    if (
      extendedPathname.startsWith("/app") ||
      extendedPathname.startsWith("/change-password")
    ) {
      const newUrl = new URL("/sign-in", siteUrl);
      console.log("AAA", newUrl);
      return NextResponse.redirect(newUrl);
    }
  } else if (isAuthenticated) {
    if (
      extendedPathname === "/" ||
      extendedPathname.startsWith("/sign-in") ||
      extendedPathname.startsWith("/sign-up")
    ) {
      const newUrl = new URL("/app", siteUrl);
      console.log("BBB", newUrl);
      return NextResponse.redirect(newUrl);
    } else if (extendedPathname === "/app") {
      const newUrl = new URL("/app/play", siteUrl);
      console.log("CCC", newUrl);
      return NextResponse.redirect(newUrl);
    }
  }

  return supabaseResponse;
}
