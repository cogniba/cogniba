import { DeepReadonly } from "@/lib/typescript/DeepReadOnly";

export type RouteMatch = {
  path: string;
  type: "exact" | "startsWith";
};

interface RouteProtectionConfig {
  protectedRoutes: {
    authenticatedRedirects: RouteMatch[];
    nonAuthenticatedRedirects: RouteMatch[];
  };
}

const routeProtectionConfig = {
  protectedRoutes: {
    authenticatedRedirects: [
      { path: "/", type: "exact" },
      { path: "/sign-in", type: "exact" },
      { path: "/sign-up", type: "exact" },
      { path: "/forgot-password", type: "exact" },
      { path: "/app", type: "exact" },
    ] satisfies RouteMatch[],
    nonAuthenticatedRedirects: [
      { path: "/app", type: "startsWith" },
    ] satisfies RouteMatch[],
  },
} as DeepReadonly<RouteProtectionConfig>;

export default routeProtectionConfig;
