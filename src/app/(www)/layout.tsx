import Header from "@/components/www/header/Header";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <Header>{children}</Header>;
}
