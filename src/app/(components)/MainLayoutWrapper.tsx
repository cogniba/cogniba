interface MainLayoutWrapperProps {
  readonly children: React.ReactNode;
}

export default function MainLayoutWrapper({
  children,
}: MainLayoutWrapperProps) {
  return <div>{children}</div>;
}
