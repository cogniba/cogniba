import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertTitle } from "./ui/alert";

interface FormAlertProps {
  variant: "destructive" | "success";
  message: string;
}

export default function FormAlert({ variant, message }: FormAlertProps) {
  return (
    <Alert className="flex items-center p-3" variant={variant}>
      <div className="mr-2.5">
        {variant === "success" ? (
          <CheckCircle className="h-4 w-4" />
        ) : (
          <AlertCircle className="h-4 w-4" />
        )}
      </div>
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}
