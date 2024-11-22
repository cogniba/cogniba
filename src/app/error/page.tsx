import SimpleMessageScreen from "@/components/SimpleMessageScreen";

export default function ErrorPage() {
  return (
    <SimpleMessageScreen
      variant="error"
      mainMessage={<>Something went wrong</>}
    />
  );
}
