"use client";

import getProfile from "@/actions/getProfile";
import { createContext, useContext, useEffect, useState } from "react";
import type { SubscriptionType } from "../database/schemas/customersTable";
import getCustomer from "@/actions/getCustomer";
import getFreePlan from "@/lib/stripe/getFreePlan";
import redirectToError from "@/actions/redirectToError";
import { usePostHog } from "posthog-js/react";

type AuthContextValue = {
  status: "loading" | "authenticated";
  userId?: string;
  fullName?: string;
  email?: string;
  subscriptionType?: SubscriptionType;
};

export const AuthContext = createContext<AuthContextValue>({
  status: "loading",
});

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const posthog = usePostHog();
  const [state, setState] = useState<AuthContextValue>({
    status: "loading",
  });

  useEffect(() => {
    (async () => {
      const { freePlan, error } = getFreePlan();
      if (error || !freePlan) {
        return redirectToError("Failed to get free plan");
      }

      const profilePromise = getProfile();
      const customerPromise = getCustomer();

      const [{ profile, error: profileError }, { customer }] =
        await Promise.all([profilePromise, customerPromise]);

      if (profileError || !profile) {
        return redirectToError("Failed to get profile");
      }

      setState({
        status: "authenticated",
        userId: profile.userId,
        fullName: profile.fullName,
        email: profile.email,
        subscriptionType: customer?.subscriptionType || freePlan.name,
      });

      posthog.identify(profile.userId, {
        email: profile.email,
        full_name: profile.fullName,
        hasFinishedTutorial: profile.hasFinishedTutorial,
        createdAt: profile.createdAt,
        subscription_type: customer?.subscriptionType || freePlan.name,
      });
    })();
  }, [posthog]);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
