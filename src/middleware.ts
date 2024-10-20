// import { auth } from "@/auth/auth";

// export default auth((request) => {
//   const isAuthenticated = request.auth !== null;
//   const pathname = request.nextUrl.pathname;

//   if (!isAuthenticated) {
//     if (pathname.startsWith("/app") || pathname.startsWith("/sign-up")) {
//       const newUrl = new URL("/sign-in", request.nextUrl.origin);
//       return Response.redirect(newUrl);
//     }
//   } else if (isAuthenticated) {
//     if (pathname === "/" || pathname.startsWith("/sign-in")) {
//       const newUrl = new URL("/app", request.nextUrl.origin);
//       return Response.redirect(newUrl);
//     } else if (
//       pathname.startsWith("/sign-up") &&
//       request.auth?.user.role !== "admin"
//     ) {
//       const newUrl = new URL("/app", request.nextUrl.origin);
//       return Response.redirect(newUrl);
//     } else if (pathname === "/app") {
//       const newUrl = new URL("/app/play", request.nextUrl.origin);
//       return Response.redirect(newUrl);
//     }
//   }
// });

import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
