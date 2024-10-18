import { signIn } from "@/auth/auth";

export default function HomePage() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">Sign in with google</button>
    </form>
  );
}
