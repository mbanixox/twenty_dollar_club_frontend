import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, RefreshCw, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AwaitingApprovalStepProps {
  applicationStatus: "pending" | "approved" | "rejected";
  onCheckStatus: () => Promise<void>;
}

const ApprovalWaitingStep = ({
  applicationStatus,
  onCheckStatus,
}: AwaitingApprovalStepProps) => {
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckStatus = async () => {
    setIsChecking(true);
    await onCheckStatus();
    setTimeout(() => setIsChecking(false), 1000);
  };

  return (
    <Card className="border-2">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
          <Clock className="w-10 h-10 text-yellow-600 dark:text-yellow-500" />
        </div>
        <CardTitle className="text-2xl">Application Submitted!</CardTitle>
        <CardDescription className="text-base">
          Your membership application is awaiting admin approval
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert
          className={
            applicationStatus === "approved"
              ? "border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-900"
              : applicationStatus === "rejected"
                ? "border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900"
                : "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-900"
          }
        >
          <Clock
            className={
              applicationStatus === "approved"
                ? "h-4 w-4 text-green-600 dark:text-green-500"
                : applicationStatus === "rejected"
                  ? "h-4 w-4 text-red-600 dark:text-red-500"
                  : "h-4 w-4 text-yellow-600 dark:text-yellow-500"
            }
          />
          <AlertDescription
            className={
              applicationStatus === "approved"
                ? "text-sm text-green-800 dark:text-green-200"
                : applicationStatus === "rejected"
                  ? "text-sm text-red-800 dark:text-red-200"
                  : "text-sm text-yellow-800 dark:text-yellow-200"
            }
          >
            <strong>Status: </strong>
            {applicationStatus === "pending" && "Pending Review"}
            {applicationStatus === "approved" &&
              "Approved! You can proceed to payment."}
            {applicationStatus === "rejected" &&
              "Application not approved"}
          </AlertDescription>
        </Alert>
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-lg">What happens next?</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-primary">1</span>
                </div>
                <span>Our admin team will review your application details</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-primary">2</span>
                </div>
                <span>
                  You&apos;ll receive an email notification once your
                  application is reviewed
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-primary">3</span>
                </div>
                <span>
                  Once approved, you can proceed to complete your payment
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
            <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">
              Typical Review Time
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Applications are usually reviewed within 24-48 hours during
              business days.
            </p>
          </div>
        </div>
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleCheckStatus}
            disabled={isChecking}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw
              className={`w-4 h-4 ${isChecking ? "animate-spin" : ""}`}
            />
            {isChecking ? "Checking..." : "Check Status"}
          </Button>
        </div>
        {applicationStatus === "approved" && (
          <Alert className="border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-900">
            <Check className="h-4 w-4 text-green-600 dark:text-green-500" />
            <AlertDescription className="text-sm text-green-800 dark:text-green-200">
              <strong>Congratulations!</strong> Your application has been
              approved. Click &quot;Continue&quot; below to proceed to payment.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default ApprovalWaitingStep;
