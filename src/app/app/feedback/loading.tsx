import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FeedbackLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-card py-5 xs:bg-background">
      <Card className="w-full max-w-lg border-transparent px-2 shadow-none xs:mx-6 xs:border-border xs:shadow-sm">
        <CardHeader>
          <CardTitle>Send Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="mb-2 inline-block text-sm font-medium">
            Feedback Type
          </span>
          <div className="h-10 w-full animate-pulse rounded-md border border-input bg-secondary/30 px-3 py-2" />

          <span className="mb-2 mt-7 inline-block text-sm font-medium">
            Message
          </span>
          <div className="mb-6 h-[13.75rem] w-full animate-pulse rounded-md border border-input bg-secondary/30 px-3 py-2" />

          <div className="h-10 w-full animate-pulse rounded-md bg-primary/30" />
        </CardContent>
      </Card>
    </div>
  );
}
