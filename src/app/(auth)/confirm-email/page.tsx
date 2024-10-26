interface ConfirmEmailPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ConfirmEmailPage({
  searchParams,
}: ConfirmEmailPageProps) {
  const awaitedSearchParams = await searchParams;

  if (
    !("email" in awaitedSearchParams) ||
    !("full_name" in awaitedSearchParams) ||
    typeof awaitedSearchParams.email !== "string" ||
    typeof awaitedSearchParams.full_name !== "string"
  ) {
    return <div>Invalid request</div>;
  }

  const email = decodeURIComponent(awaitedSearchParams.email);
  const fullName = decodeURIComponent(awaitedSearchParams.full_name);

  return (
    <div>
      <div>Hey, {fullName}. Please confirm your email</div>
      <div>{email}</div>
    </div>
  );
}
