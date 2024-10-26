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

  const isAuthenticated = user !== null;
  const pathname = request.nextUrl.pathname;

  if (!isAuthenticated) {
    if (pathname.startsWith("/app")) {
      const newUrl = new URL("/sign-in", request.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }
  } else if (isAuthenticated) {
    if (
      pathname === "/" ||
      pathname.startsWith("/sign-in") ||
      pathname.startsWith("/sign-up")
    ) {
      const newUrl = new URL("/app", request.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    } else if (pathname === "/app") {
      const newUrl = new URL("/app/play", request.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }
  }

  return supabaseResponse;
}
