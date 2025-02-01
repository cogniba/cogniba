"use client";

import getProfile from "@/actions/getProfile";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextValue {
  status: "loading" | "authenticated";
  userId?: string;
  fullName?: string;
  email?: string;
}

export const AuthContext = createContext<AuthContextValue>({
  status: "loading",
  userId: undefined,
  fullName: undefined,
  email: undefined,
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const router = useRouter();

  const [state, setState] = useState<AuthContextValue>({
    status: "loading",
    userId: undefined,
    fullName: undefined,
    email: undefined,
  });

  useEffect(() => {
    (async () => {
      const { profile, error } = await getProfile();
      if (error || !profile) {
        const error = new Error("Failed to get profile");
        console.error(error);

        const errorUrl = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/error`);
        errorUrl.searchParams.set("message", error.message);
        router.push(errorUrl.toString());
        return;
      }

      setState({
        status: "authenticated",
        userId: profile.userId,
        fullName: profile.fullName,
        email: profile.email,
      });
    })();
  }, [router]);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
