export type RouteMatch = {
  path: string;
  type: "exact" | "startsWith";
};

export const protectedRoutes = {
  authenticatedRedirects: [
    { path: "/", type: "exact" },
    { path: "/sign-in", type: "exact" },
    { path: "/sign-up", type: "exact" },
    { path: "/forgot-password", type: "exact" },
    { path: "/app", type: "exact" },
  ] as RouteMatch[],
  nonAuthenticatedRedirects: [
    { path: "/app", type: "startsWith" },
  ] as RouteMatch[],
};
