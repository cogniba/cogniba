interface ConfirmEmailPageProps {
  params: Promise<{ email: string }>;
}

export default async function ConfirmEmailPage({
  params,
}: ConfirmEmailPageProps) {
  const email = (await params).email;

  return (
    <div>
      <div>Confirm your email</div>
      <div>{email}</div>
    </div>
  );
}
