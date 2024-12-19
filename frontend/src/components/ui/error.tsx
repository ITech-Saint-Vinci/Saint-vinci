import React from "react";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SignInErrorProps {
  message: string;
}

export const FormError: React.FC<SignInErrorProps> = ({ message }) => {
  return (
    <Alert
      variant="destructive"
      className="flex items-center justify-between p-4 space-x-4"
    >
      <div className="flex items-center space-x-4">
        <AlertTriangle className="h-5 w-5" />
        <div>
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </div>
      </div>
    </Alert>
  );
};
