"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/lib/types";
import { DollarSign, Smartphone, CreditCard, Wallet, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { projectPaymentRequest } from "@/lib/mpesa/actions";
import { toast } from "sonner";
import { usePaymentSocket } from "@/hooks/usePaymentSocket";
import { useRouter } from "next/navigation";

interface PaymentDialogProps {
  project: Project;
  userEmail: string; // Add this prop
}

const PaymentDialog = ({ project, userEmail }: PaymentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [waitingForPayment, setWaitingForPayment] = useState(false);
  const router = useRouter();

  // Initialize WebSocket for project payment
  const { disconnect } = usePaymentSocket({
    userEmail,
    enabled: waitingForPayment,
    onProjectPaid: (payload: { contribution_id: string; project_id: string }) => {
      console.log("Project payment confirmed:", payload);
      
      toast.success("Payment successful!", {
        description: `Your contribution to ${project.title} has been recorded.`,
      });
      
      setWaitingForPayment(false);
      setIsProcessing(false);
      setOpen(false);
      
      // Reset form
      setAmount("");
      setMpesaPhone("");
      
      // Refresh the page or redirect to show updated project
      router.refresh();
    },
    onError: (payload) => {
      console.error("Payment error:", payload);
      toast.error("Payment failed", {
        description: payload.message || "Please try again.",
      });
      setWaitingForPayment(false);
      setIsProcessing(false);
    },
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (waitingForPayment) {
        disconnect();
      }
    };
  }, [waitingForPayment, disconnect]);

  const handlePayment = async () => {
    if (!amount || !mpesaPhone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("project_id", project.id);
      formData.append("phone", mpesaPhone);
      formData.append("amount", amount);

      const result = await projectPaymentRequest(formData);

      if (result.status === "success") {
        toast.success(result.message || "Payment request sent successfully", {
          description: "Check your phone to complete payment.",
        });
        setWaitingForPayment(true);
      } else {
        toast.error(result.error || "Payment request failed");
        setIsProcessing(false);
      }
    } catch {
      toast.error("An error occurred while processing payment");
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          <DollarSign className="h-4 w-4 mr-2" />
          Make a Contribution
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Contribute to {project.title}</DialogTitle>
          <DialogDescription>
            Choose your preferred payment method to support this project
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Contribution Amount (KSh)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              className="text-lg"
              disabled={isProcessing || waitingForPayment}
            />
          </div>

          <Separator />

          {/* Payment Methods */}
          <Tabs defaultValue="mpesa" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mpesa" disabled={isProcessing || waitingForPayment}>
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile
              </TabsTrigger>
              <TabsTrigger value="card" disabled={isProcessing || waitingForPayment}>
                <CreditCard className="h-4 w-4 mr-2" />
                Card
              </TabsTrigger>
              <TabsTrigger value="wallet" disabled={isProcessing || waitingForPayment}>
                <Wallet className="h-4 w-4 mr-2" />
                Wallet
              </TabsTrigger>
            </TabsList>

            {/* M-Pesa */}
            <TabsContent value="mpesa" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">M-Pesa Payment</CardTitle>
                  <CardDescription>
                    Enter your M-Pesa phone number to complete payment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mpesa-phone">Phone Number</Label>
                    <Input
                      id="mpesa-phone"
                      type="tel"
                      placeholder="254 XXX XXX XXX"
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      disabled={isProcessing || waitingForPayment}
                    />
                  </div>
                  
                  {waitingForPayment && (
                    <Card className="p-4 border-primary/20 bg-primary/5">
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                        <div>
                          <p className="font-medium text-sm text-foreground">
                            Waiting for payment confirmation...
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Please complete the payment on your phone.
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}
                  
                  <Button
                    className="w-full"
                    disabled={!amount || !mpesaPhone || isProcessing || waitingForPayment}
                    onClick={handlePayment}
                  >
                    {isProcessing || waitingForPayment ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {waitingForPayment ? "Waiting for Payment..." : "Processing..."}
                      </>
                    ) : (
                      "Send M-Pesa Prompt"
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    You will receive a prompt on your phone to complete the
                    payment
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Card Payments (Mastercard) */}
            <TabsContent value="card" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Card Payment</CardTitle>
                  <CardDescription>
                    Pay securely with your credit or debit card
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Cardholder Name</Label>
                    <Input id="card-name" type="text" placeholder="John Doe" />
                  </div>
                  <Button className="w-full" disabled={!amount}>
                    Pay KSh {amount || "0"}
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    <span>Accepts Visa, Mastercard, and Amex</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Digital Wallets */}
            <TabsContent value="wallet" className="space-y-4">
              <div className="grid gap-3">
                {/* PayPal */}
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">PayPal</CardTitle>
                        <CardDescription className="text-xs">
                          Pay with your PayPal account
                        </CardDescription>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">
                          PP
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={!amount}
                    >
                      Continue with PayPal
                    </Button>
                  </CardContent>
                </Card>

                {/* Venmo */}
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">Venmo</CardTitle>
                        <CardDescription className="text-xs">
                          Pay with your Venmo account
                        </CardDescription>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center">
                        <span className="text-sky-600 font-bold text-sm">
                          V
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={!amount}
                    >
                      Continue with Venmo
                    </Button>
                  </CardContent>
                </Card>

                {/* Zelle */}
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">Zelle</CardTitle>
                        <CardDescription className="text-xs">
                          Pay with Zelle
                        </CardDescription>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">
                          Z
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Input type="email" placeholder="Your email or phone" />
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled={!amount}
                      >
                        Pay with Zelle
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Cash App */}
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">Cash App</CardTitle>
                        <CardDescription className="text-xs">
                          Pay with Cash App
                        </CardDescription>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <DollarSign className="text-green-600 h-5 w-5" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Input type="text" placeholder="$cashtag" />
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled={!amount}
                      >
                        Pay with Cash App
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Summary */}
          {amount && (
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Total Contribution:
                  </span>
                  <span className="text-2xl font-bold">KSh {amount}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;