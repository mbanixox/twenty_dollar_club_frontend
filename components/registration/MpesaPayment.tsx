"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, AlertCircle, Check, Loader2 } from "lucide-react";
import { membershipPaymentRequest } from "@/lib/mpesa/actions";
import { toast } from "sonner";
import { usePaymentSocket } from "@/hooks/usePaymentSocket";

interface MpesaPaymentStepProps {
  phoneNumber: string;
  userEmail: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaymentSuccess?: () => void;
}

const MpesaPaymentStep = ({
  phoneNumber,
  userEmail,
  onPhoneChange,
  onPaymentSuccess,
}: MpesaPaymentStepProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waitingForPayment, setWaitingForPayment] = useState(false);

  const amount = 1; // Registration amount in KSH

  // Initialize WebSocket - only when waiting for payment
  const { disconnect } = usePaymentSocket({
    userEmail,
    enabled: waitingForPayment,
  });

  // Add cleanup on unmount
  useEffect(() => {
    return () => {
      if (waitingForPayment) {
        console.log("Component unmounting, disconnecting socket");
        disconnect();
      }
    };
  }, [waitingForPayment, disconnect]);

  const handlePayment = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("phone", phoneNumber);
      formData.append("amount", amount.toString());

      const result = await membershipPaymentRequest(formData);

      if (result.status === "success") {
        toast.success("Payment request sent!", {
          description:
            result.message || "Check your phone to complete payment.",
        });
        setWaitingForPayment(true);
      } else {
        toast.error("Payment request failed", {
          description: result.error || "Please try again.",
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed", {
        description: "An error occurred. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-bold text-foreground">M-Pesa Payment</h2>
        <p className="text-muted-foreground mt-1">
          Complete your registration with M-Pesa
        </p>
      </div>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              Registration Fee
            </p>
            <p className="text-3xl font-bold text-foreground">
              KSH {amount.toFixed(2)}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-primary" />
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div>
          <Label htmlFor="mpesa_phone" className="text-sm font-medium">
            M-Pesa Phone Number
          </Label>
          <Input
            type="tel"
            name="mpesa_phone"
            value={phoneNumber}
            onChange={onPhoneChange}
            pattern="254[0-9]{9}"
            className="mt-1"
            placeholder="254700000000"
            maxLength={12}
            required
            disabled={isSubmitting || waitingForPayment}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter your M-Pesa registered phone number (e.g., 254712345678)
          </p>
        </div>

        <Card className="p-4 border-accent/20 bg-accent/5">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm text-foreground">
              <p className="font-medium">How to complete payment:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Click &quot;Complete Payment&quot; to receive STK push</li>
                <li>Enter your M-Pesa PIN on your phone</li>
                <li>You&apos;ll receive a confirmation message</li>
                <li>Your account will be activated automatically</li>
              </ol>
            </div>
          </div>
        </Card>

        {waitingForPayment && (
          <Card className="p-4 border-primary/20 bg-primary/5">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
              <div>
                <p className="font-medium text-sm text-foreground">
                  Waiting for payment confirmation...
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Please complete the payment on your phone. Do not close this
                  page.
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Smartphone className="w-4 h-4" />
          <span>Secure payment powered by Safaricom M-Pesa</span>
        </div>

        <Button
          type="button"
          onClick={handlePayment}
          disabled={
            !phoneNumber ||
            phoneNumber.length < 12 ||
            isSubmitting ||
            waitingForPayment
          }
          className="w-full gap-2 mt-4"
          size="lg"
        >
          {isSubmitting || waitingForPayment ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {waitingForPayment ? "Waiting for Payment..." : "Processing..."}
            </>
          ) : (
            <>
              Complete Payment
              <Check className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MpesaPaymentStep;
