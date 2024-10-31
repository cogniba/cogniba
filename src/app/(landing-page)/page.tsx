import Link from "next/link";

export default function LandingPagePage() {
  return (
    <div>
      <h1>Landing Page</h1>
      <p>
        <Link href="/sign-in">Sign In</Link>
      </p>
      <p>
        <Link href="/sign-up">Sign Up</Link>
      </p>
    </div>
  );
}
