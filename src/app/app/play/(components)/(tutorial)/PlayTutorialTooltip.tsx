import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TooltipRenderProps } from "react-joyride";

export default function PlayTutorialTooltip({
  step,
  primaryProps,
  backProps,
  index,
}: TooltipRenderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{step.title}</CardTitle>
      </CardHeader>
      <CardContent className="max-w-md text-slate-300">
        {step.content}
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        {/* {index > 0 && (
          <Button variant="secondary" {...backProps}>
            Back
          </Button>
        )} */}
        {/* <Button {...primaryProps} >Next</Button> */}
        <Button {...primaryProps}>{step.data?.buttonText || "Next"}</Button>
      </CardFooter>
    </Card>
  );
}
