"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmEmailPage() {
  const [email, setEmail] = useState<null | string>(null);
  const [name, setName] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const email = window.localStorage.getItem("signUpEmail");
    const fullName = window.localStorage.getItem("signInName");

    if (email) {
      setEmail(email);
    }

    if (fullName) {
      setName(fullName.split(" ")[0]);
    }

    setIsLoading(false);
  }, []);

  if (!isLoading && (!email || !name)) {
    router.push("/sign-in");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Hey, {name}. Please confirm your email</div>
      <div>{email}</div>
    </div>
  );
}
