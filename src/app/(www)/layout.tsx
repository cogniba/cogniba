import Header from "@/components/www/header/Header";

type WwwLayoutProps = {
  children: React.ReactNode;
};

export default function WwwLayout({ children }: WwwLayoutProps) {
  return <Header>{children}</Header>;
}
